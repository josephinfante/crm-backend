import { Op, WhereOptions } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { BusinessUnit } from "../../domain/business-unit/business-unit";
import { BusinessUnitPresenter, IBusinessUnitResponse } from "../../interfaces/presenters/business-unit.presenter";
import { UniqueID, ListCondition } from "../../shared/utils";
import { BusinessUnitError } from "../../shared/errors";
import { BusinessUnitModel } from "../../shared/models";

class BusinessUnitDao {
    async create(access: IAccessPermission, business_unit: BusinessUnit): Promise<IBusinessUnitResponse> {
        try {
            const new_business_unit = {
                id: UniqueID.generate(),
                name: business_unit.name,
                nickname: business_unit.nickname,
                code: business_unit.code,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                user_id: access.user_id,
            }
            const [_business_unit, created] = await BusinessUnitModel.findOrCreate({
                    where: {
                        [Op.or] : [
                            {name: business_unit.name},
                            {nickname: business_unit.nickname},
                            {code: business_unit.code},
                        ]
                    },
                    defaults: new_business_unit,
                })
                .then(business_unit => business_unit)
                .catch(_error => { throw new BusinessUnitError("Ha ocurrido un error al tratar de crear la unidad de negocio.")});

            if (!created) throw new BusinessUnitError("La unidad de negocio ya existe.");

            return BusinessUnitPresenter(new_business_unit, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new BusinessUnitError(error.message);
            else throw new Error("Ha ocurrido un error al crear la unidad de negocio.");
        }
    }
    async update(access: IAccessPermission, id: string, business_unit: BusinessUnit): Promise<IBusinessUnitResponse> {
        try {
            const business_unit_exist = access.super_admin === true ?
                await BusinessUnitModel.findOne({ where: { id: id } })
                    .then(business_unit => business_unit)
                    .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.") }) :
                await BusinessUnitModel.findOne({ where: { id: id, user_id: access.user_id } })
                    .then(business_unit => business_unit)
                    .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.") });

            if (!business_unit_exist) throw new BusinessUnitError("La unidad de negocio no existe.");

            const business_unit_coincidence = (business_unit.name !== business_unit_exist.dataValues.name || business_unit.nickname !== business_unit_exist.dataValues.nickname || business_unit.code !== business_unit_exist.dataValues.code) ? 
                await BusinessUnitModel.findAll({
                        where: {
                            [Op.and]: [
                                {
                                    [Op.or]: [
                                        {name: business_unit.name},
                                        {nickname: business_unit.nickname},
                                        {code: business_unit.code},
                                    ]
                                },
                                ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                                { id: { [Op.ne]: id } }
                            ]
                        }
                    })
                    .then(business_units => business_units)
                    .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar las unidades de negocio.") }) : [];

            if (business_unit_coincidence.length > 0) throw new BusinessUnitError("Ya existe una unidad de negocio con los datos proporcionados.");

            business_unit_exist.set({
                name: business_unit.name ?? business_unit_exist.dataValues.name,
                nickname: business_unit.nickname ?? business_unit_exist.dataValues.nickname,
                code: business_unit.code ?? business_unit_exist.dataValues.code,
                hidden: business_unit.hidden ?? business_unit_exist.dataValues.hidden,
                updatedAt: Date.now(),
            });

            const updated = await business_unit_exist.save()
                .then(business_unit => business_unit)
                .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al actualizar la unidad de negocio.") });

            return BusinessUnitPresenter(updated.dataValues, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new BusinessUnitError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar la unidad de negocio.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const business_unit_exist = access.super_admin === true ?
                await BusinessUnitModel.findOne({ where: { id: id } })
                    .then(business_unit => business_unit)
                    .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.") }) :
                await BusinessUnitModel.findOne({ where: { id: id, user_id: access.user_id } })
                    .then(business_unit => business_unit)
                    .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.") });

            if (!business_unit_exist) throw new BusinessUnitError("La unidad de negocio no existe.");

            business_unit_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });

            await business_unit_exist.save().catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al eliminar la unidad de negocio.") });
        } catch (error) {
            if (error instanceof Error && error.message) throw new BusinessUnitError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar la unidad de negocio.");
        }
    }
    async findAll(access: IAccessPermission, business_unit?: string): Promise<IBusinessUnitResponse[]> {
        try {
            const whereCondition: Record<string, any> = { user_id: access.user_id };

            if (access.super_admin === true) {
                delete whereCondition.user_id;
            }

            let nameOrCodeCondition: WhereOptions = {};

            if (business_unit) {
                const businessUnitCondition = {
                    [Op.or]: [
                        { name: { [Op.like]: `%${business_unit}%` } },
                        { nickname: { [Op.like]: `%${business_unit}%` } },
                        { code: { [Op.like]: `%${business_unit}%` } },
                    ],
                };

                nameOrCodeCondition = businessUnitCondition;
            }

            const business_units = await BusinessUnitModel.findAll({
                where: {
                    ...whereCondition,
                    ...nameOrCodeCondition,
                },
                ...ListCondition(access),
            });

            return business_units.map(business_unit => BusinessUnitPresenter(business_unit.dataValues, access));
        } catch (error) {
            if (error instanceof Error && error.message) throw new BusinessUnitError(error.message);
            else throw new Error("Ha ocurrido un error al obtener las unidades de negocio.");
        }
    }
}
const businessUnitDao = new BusinessUnitDao();
export default businessUnitDao;