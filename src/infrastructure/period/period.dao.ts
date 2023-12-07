import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { ListCondition, UniqueID } from "../../shared/utils";
import { IPeriodResponse, PeriodPresenter } from "../../interfaces/presenters/period.presenter";
import { Period } from "../../domain/period/period";
import { BusinessUnitModel, PeriodModel } from "../../shared/models";
import { BusinessUnitError, PeriodError } from "../../shared/errors";

class PeriodDao {
    async create(access: IAccessPermission, period: Period): Promise<IPeriodResponse> {
        try {
            const business_unit_exist = access.super_admin === true ?
                await BusinessUnitModel.findByPk(period.business_unit_id)
                    .then(business_unit => business_unit)
                    .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.") }) :
                await BusinessUnitModel.findOne({ 
                        where: { id: period.business_unit_id, user_id: access.user_id }
                    })
                    .then(business_unit => business_unit)
                    .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.") });

            if (!business_unit_exist) throw new BusinessUnitError("La unidad de negocio no existe.");

            const new_period = {
                id: UniqueID.generate(),
                name: period.name,
                nickname: period.nickname,
                code: period.code,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                business_unit_id: period.business_unit_id,
                user_id: access.user_id,
            }
            const [_period, created] = await PeriodModel.findOrCreate({
                    where: {
                        [Op.or] : [
                            {name: period.name},
                            {nickname: period.nickname},
                            {code: period.code},
                        ]
                    },
                    defaults: new_period,
                })
                .then(period => period)
                .catch(_error => { throw new PeriodError("Ha ocurrido un error al tratar de crear el período académico.")});

            if (!created) throw new PeriodError("El período académico ya existe.");

            return PeriodPresenter(new_period, access, business_unit_exist.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new PeriodError(error.message);
            else throw new Error("Ha ocurrido un error al crear el período académico.");
        }
    }
    async update(access: IAccessPermission, id: string, period: Period): Promise<IPeriodResponse> {
        try {
            let business_unit;
            const period_exist = access.super_admin === true ?
                await PeriodModel.findOne({ 
                        where: { id: id },
                        include: [{ model: BusinessUnitModel }]
                    })
                    .then(period => period)
                    .catch((_error) => { throw new PeriodError("Ha ocurrido un error al revisar el período académico.") }) :
                await PeriodModel.findOne({ 
                        where: { id: id, user_id: access.user_id },
                        include: [{ model: BusinessUnitModel }]
                    })
                    .then(period => period)
                    .catch((_error) => { throw new PeriodError("Ha ocurrido un error al revisar el período académico.") });

            if (!period_exist) throw new PeriodError("el período académico no existe.");

            const period_coincidence = (period.name !== period_exist.dataValues.name || period.nickname !== period_exist.dataValues.nickname || period.code !== period_exist.dataValues.code || period.business_unit_id !== period_exist.dataValues.business_unit_id) ? 
                await PeriodModel.findAll({
                        where: {
                            [Op.and]: [
                                {
                                    [Op.or]: [
                                        {name: period.name},
                                        {nickname: period.nickname},
                                        {code: period.code},
                                    ]
                                },
                                ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                                ...(period.business_unit_id !== period_exist.dataValues.business_unit_id ? [{ business_unit_id: period.business_unit_id }] : [{ business_unit_id: { [Op.ne]: period.business_unit_id }}]),
                                { id: { [Op.ne]: id } }
                            ]
                        }
                    })
                    .then(periods => periods)
                    .catch((_error) => { throw new PeriodError("Ha ocurrido un error al revisar los períodos académicos.") }) : [];

            if (period_coincidence.length > 0) throw new PeriodError("Ya existe una sede con los datos proporcionados.");

            business_unit = period.business_unit_id !== period_exist.dataValues.business_unit_id ?
                await BusinessUnitModel.findOne({
                        where: [
                            { id: period.business_unit_id },
                            ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                        ]
                    })
                    .then(business_unit => business_unit)
                    .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.") }) :
                period_exist.dataValues.business_unit;

            period_exist.set({
                name: period.name ?? period_exist.dataValues.name,
                nickname: period.nickname ?? period_exist.dataValues.nickname,
                code: period.code ?? period_exist.dataValues.code,
                hidden: period.hidden ?? period_exist.dataValues.hidden,
                business_unit_id: business_unit.dataValues.id,
                updatedAt: Date.now(),
            });

            const updated = await period_exist.save()
                .then(period => period)
                .catch((_error) => { throw new PeriodError("Ha ocurrido un error al tratar de actualizar el período académico.") });

            return PeriodPresenter(updated.dataValues, access, business_unit.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new PeriodError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar el período académico.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const period_exist = access.super_admin === true ?
                await PeriodModel.findOne({ where: { id: id } })
                    .then(period => period)
                    .catch((_error) => { throw new PeriodError("Ha ocurrido un error al revisar el período académico.") }) :
                await PeriodModel.findOne({ where: { id: id, user_id: access.user_id } })
                    .then(period => period)
                    .catch((_error) => { throw new PeriodError("Ha ocurrido un error al revisar el período académico.") });

            if (!period_exist) throw new PeriodError("el período académico no existe.");

            period_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });

            await period_exist.save().catch((_error) => { throw new PeriodError("Ha ocurrido un error al tratar de eliminar el período académico.") });
        } catch (error) {
            if (error instanceof Error && error.message) throw new PeriodError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar el período académico.");
        }
    }
    async findByBusinessUnitId(access: IAccessPermission, business_unit_id: string): Promise<IPeriodResponse[]> {
        try {
            const periods = access.super_admin === true ? 
                await PeriodModel.findAll({ 
                        where: { business_unit_id: business_unit_id },
                        include: [{ model: BusinessUnitModel }]
                    })
                    .then(periods => periods)
                    .catch((_error) => { throw new PeriodError("Ha ocurrido un error al obtener los períodos académicos.") }) :
                await PeriodModel.findAll({ 
                        where: [
                            { business_unit_id: business_unit_id, user_id: access.user_id },
                            ListCondition(access)
                        ],
                        include: [{ model: BusinessUnitModel }]
                    })
                    .then(periods => periods)
                    .catch((_error) => { throw new PeriodError("Ha ocurrido un error al obtener los períodos académicos.") });

            return periods.map(period => PeriodPresenter(period.dataValues, access, period.dataValues.business_unit.dataValues));
        } catch (error) {
            if (error instanceof Error && error.message) throw new PeriodError(error.message);
            else throw new Error("Ha ocurrido un error al obtener los períodos académicos.");
        }
    }
    async findAll(access: IAccessPermission): Promise<IPeriodResponse[]> {
        try {
            const periods = access.super_admin === true ? 
                await PeriodModel.findAll({
                        include: [{ model: BusinessUnitModel }]
                    })
                    .then(periods => periods)
                    .catch((_error) => { throw new PeriodError("Ha ocurrido un error al obtener los períodos académicos.") }) :
                await PeriodModel.findAll({ 
                        where: [
                            { user_id: access.user_id },
                            ListCondition(access)
                        ],
                        include: [{ model: BusinessUnitModel }]
                    })
                    .then(periods => periods)
                    .catch((_error) => { throw new PeriodError("Ha ocurrido un error al obtener los períodos académicos.") });

            return periods.map(period => PeriodPresenter(period.dataValues, access, period.dataValues.business_unit.dataValues));
        } catch (error) {
            if (error instanceof Error && error.message) throw new PeriodError(error.message);
            else throw new Error("Ha ocurrido un error al obtener los períodos académicos.");
        }
    }
}
const periodDao = new PeriodDao();
export default periodDao;