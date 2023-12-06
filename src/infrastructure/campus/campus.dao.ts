import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { UniqueID } from "../../shared/utils";
import { CampusPresenter, ICampusResponse } from "../../interfaces/presenters/campus.presenter";
import { Campus } from "../../domain/campus/campus";
import { BusinessUnitModel, CampusModel } from "../../shared/models";
import { BusinessUnitError, CampusError } from "../../shared/errors";

class CampusDao {
    async create(access: IAccessPermission, campus: Campus): Promise<ICampusResponse> {
        try {
            const business_unit_exist = access.super_admin === true ?
                await BusinessUnitModel.findByPk(campus.business_unit_id)
                    .then(business_unit => business_unit)
                    .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.") }) :
                await BusinessUnitModel.findOne({ 
                        where: { id: campus.business_unit_id, user_id: access.user_id }
                    })
                    .then(business_unit => business_unit)
                    .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.") });

            if (!business_unit_exist) throw new BusinessUnitError("La unidad de negocio no existe.");

            const new_campus = {
                id: UniqueID.generate(),
                name: campus.name,
                nickname: campus.nickname,
                code: campus.code,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                business_unit_id: campus.business_unit_id,
                user_id: access.user_id,
            }
            const [_campus, created] = await CampusModel.findOrCreate({
                    where: {
                        [Op.or] : [
                            {name: campus.name},
                            {nickname: campus.nickname},
                            {code: campus.code},
                        ]
                    },
                    defaults: new_campus,
                })
                .then(campus => campus)
                .catch(_error => { throw new CampusError("Ha ocurrido un error al tratar de crear la sede.")});

            if (!created) throw new CampusError("La sede ya existe.");

            return CampusPresenter(new_campus, access, business_unit_exist.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new CampusError(error.message);
            else throw new Error("Ha ocurrido un error al crear la sede.");
        }
    }
    async update(access: IAccessPermission, id: string, campus: Campus): Promise<ICampusResponse> {
        try {
            let business_unit;
            const campus_exist = access.super_admin === true ?
                await CampusModel.findOne({ 
                        where: { id: id },
                        include: [{ model: BusinessUnitModel }]
                    })
                    .then(campus => campus)
                    .catch((_error) => { throw new CampusError("Ha ocurrido un error al revisar la sede.") }) :
                await CampusModel.findOne({ 
                        where: { id: id, user_id: access.user_id },
                        include: [{ model: BusinessUnitModel }]
                    })
                    .then(campus => campus)
                    .catch((_error) => { throw new CampusError("Ha ocurrido un error al revisar la sede.") });

            if (!campus_exist) throw new CampusError("La sede no existe.");

            const campus_coincidence = (campus.name !== campus_exist.dataValues.name || campus.nickname !== campus_exist.dataValues.nickname || campus.code !== campus_exist.dataValues.code || campus.business_unit_id !== campus_exist.dataValues.business_unit_id) ? 
                await CampusModel.findAll({
                        where: {
                            [Op.and]: [
                                {
                                    [Op.or]: [
                                        {name: campus.name},
                                        {nickname: campus.nickname},
                                        {code: campus.code},
                                    ]
                                },
                                ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                                { id: { [Op.ne]: id } }
                            ]
                        }
                    })
                    .then(campuses => campuses)
                    .catch((_error) => { throw new CampusError("Ha ocurrido un error al revisar las sedes.") }) : [];

            if (campus_coincidence.length > 0) throw new CampusError("Ya existe una sede con los datos proporcionados.");

            business_unit = campus.business_unit_id !== campus_exist.dataValues.business_unit_id ?
                await BusinessUnitModel.findOne({
                        where: [
                            { id: campus.business_unit_id },
                            ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                        ]
                    })
                    .then(business_unit => business_unit)
                    .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.") }) :
                campus_exist.dataValues.business_unit;

            campus_exist.set({
                name: campus.name ?? campus_exist.dataValues.name,
                nickname: campus.nickname ?? campus_exist.dataValues.nickname,
                code: campus.code ?? campus_exist.dataValues.code,
                hidden: campus.hidden ?? campus_exist.dataValues.hidden,
                business_unit_id: business_unit.dataValues.id,
                updatedAt: Date.now(),
            });

            const updated = await campus_exist.save()
                .then(campus => campus)
                .catch((_error) => { throw new CampusError("Ha ocurrido un error al tratar de actualizar la sede.") });

            return CampusPresenter(updated.dataValues, access, business_unit.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new CampusError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar la sede.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const campus_exist = access.super_admin === true ?
                await CampusModel.findOne({ where: { id: id } })
                    .then(campus => campus)
                    .catch((_error) => { throw new CampusError("Ha ocurrido un error al revisar la sede.") }) :
                await CampusModel.findOne({ where: { id: id, user_id: access.user_id } })
                    .then(campus => campus)
                    .catch((_error) => { throw new CampusError("Ha ocurrido un error al revisar la sede.") });

            if (!campus_exist) throw new CampusError("La sede no existe.");

            campus_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });

            await campus_exist.save().catch((_error) => { throw new CampusError("Ha ocurrido un error al tratar de eliminar la sede.") });
        } catch (error) {
            if (error instanceof Error && error.message) throw new CampusError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar la sede.");
        }
    }
    async findByBusinessUnitId(access: IAccessPermission, business_unit_id: string): Promise<ICampusResponse[]> {
        try {
            const campuses = access.super_admin === true ? 
                await CampusModel.findAll({ 
                        where: { business_unit_id: business_unit_id },
                        include: [{ model: BusinessUnitModel }]
                    })
                    .then(campuses => campuses)
                    .catch((_error) => { throw new CampusError("Ha ocurrido un error al obtener las sedes.") }) :
                await CampusModel.findAll({ 
                        where: { business_unit_id: business_unit_id, user_id: access.user_id },
                        include: [{ model: BusinessUnitModel }]
                    })
                    .then(campuses => campuses)
                    .catch((_error) => { throw new CampusError("Ha ocurrido un error al obtener las sedes.") });

            return campuses.map(campus => CampusPresenter(campus.dataValues, access, campus.dataValues.business_unit.dataValues));
        } catch (error) {
            if (error instanceof Error && error.message) throw new CampusError(error.message);
            else throw new Error("Ha ocurrido un error al obtener las sedes.");
        }
    }
}
const campusDao = new CampusDao();
export default campusDao;