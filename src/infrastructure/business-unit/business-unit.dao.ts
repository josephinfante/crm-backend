import { Op, WhereOptions } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { BusinessUnit } from "../../domain/business-unit/business-unit";
import { BusinessUnitPresenter, IBusinessUnitResponse } from "../../interfaces/presenters/business-unit.presenter";
import { UniqueID, ListCondition } from "../../shared/utils";
import { BusinessUnitError } from "../../shared/errors";
import { BusinessUnitModel, DegreeModel } from "../../shared/models";

class BusinessUnitDao {
    async create(access: IAccessPermission, business_unit: BusinessUnit): Promise<IBusinessUnitResponse> {
        try {
            const degree_exist = await DegreeModel.findOne({ 
                    where: [
                        { id: business_unit.degree_id },
                        ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                    ]
                })
                .then(degree => degree)
                .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar el grado académico.") });

            if (!degree_exist) throw new BusinessUnitError("El grado académico proporcionado no existe.");

            const new_business_unit = {
                id: UniqueID.generate(),
                name: business_unit.name,
                nickname: business_unit.nickname,
                code: business_unit.code,
                current_period: business_unit.current_period,
                default_career: business_unit.default_career,
                next_period: business_unit.next_period,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                degree_id: business_unit.degree_id,
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

            return BusinessUnitPresenter(new_business_unit, access, degree_exist.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new BusinessUnitError(error.message);
            else throw new Error("Ha ocurrido un error al crear la unidad de negocio.");
        }
    }
    async update(access: IAccessPermission, id: string, business_unit: BusinessUnit): Promise<IBusinessUnitResponse> {
        try {
            let degree;
            const business_unit_exist = await BusinessUnitModel.findOne({
                    where: [
                        { id: id },
                        ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                    ],
                    include: [{ model: DegreeModel }]
                })
                .then(business_unit => business_unit)
                .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.") });

            if (!business_unit_exist) throw new BusinessUnitError(`La unidad de negocio con ID ${id} no existe.`);

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
                                { id: { [Op.ne]: id } }
                            ]
                        }
                    })
                    .then(business_units => business_units)
                    .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar las unidades de negocio.") }) : [];

            if (business_unit_coincidence.length > 0) throw new BusinessUnitError("Ya existe una unidad de negocio con los datos proporcionados.");

            degree = (business_unit.degree_id !== business_unit_exist.dataValues.degree.dataValues.id) ?
                await DegreeModel.findOne({ 
                        where: [
                            { id: business_unit.degree_id },
                            ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                        ]
                    })
                    .then(degree => degree)
                    .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar el grado académico.") }) :
                    business_unit_exist.dataValues.degree;

            business_unit_exist.set({
                name: business_unit.name ?? business_unit_exist.dataValues.name,
                nickname: business_unit.nickname ?? business_unit_exist.dataValues.nickname,
                code: business_unit.code ?? business_unit_exist.dataValues.code,
                current_period: business_unit.current_period ?? business_unit_exist.dataValues.current_period,
                default_career: business_unit.default_career ?? business_unit_exist.dataValues.default_career,
                next_period: business_unit.next_period ?? business_unit_exist.dataValues.next_period,
                hidden: business_unit.hidden ?? business_unit_exist.dataValues.hidden,
                updatedAt: Date.now(),
                degree_id: degree.dataValues.id,
            });

            const updated = await business_unit_exist.save()
                .then(business_unit => business_unit)
                .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al actualizar la unidad de negocio.") });

            return BusinessUnitPresenter(updated.dataValues, access, degree.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new BusinessUnitError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar la unidad de negocio.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const business_unit_exist = await BusinessUnitModel.findOne({
                    where: [
                        { id: id },
                        ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                    ],
                })
                .then(business_unit => business_unit)
                .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.") });

            if (!business_unit_exist) throw new BusinessUnitError(`La unidad de negocio con ID ${id} no existe.`);

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
                    ...ListCondition(access),
                },
                include: [{ model: DegreeModel }]
            });

            return business_units.map(business_unit => BusinessUnitPresenter(business_unit.dataValues, access, business_unit.dataValues.degree?.dataValues));
        } catch (error) {
            if (error instanceof Error && error.message) throw new BusinessUnitError(error.message);
            else throw new Error("Ha ocurrido un error al obtener las unidades de negocio.");
        }
    }
}
const businessUnitDao = new BusinessUnitDao();
export default businessUnitDao;