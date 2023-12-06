import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { School } from "../../domain/school/school";
import { ISchoolResponse, SchoolPresenter } from "../../interfaces/presenters/school.presenter";
import { BusinessUnitError, SchoolError } from "../../shared/errors";
import { ListCondition, UniqueID } from "../../shared/utils";
import { CareerModel } from "../../shared/models/career.model";
import { BusinessUnitModel, SchoolModel } from "../../shared/models";

class SchoolDao {
    async create(access: IAccessPermission, school: School): Promise<ISchoolResponse> {
        try {
            const business_unit_exist = access.super_admin === true ?
                await BusinessUnitModel.findByPk(school.business_unit_id)
                    .then(business_unit => business_unit)
                    .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.") }) :
                await BusinessUnitModel.findOne({ 
                        where: { id: school.business_unit_id, user_id: access.user_id }
                    })
                    .then(business_unit => business_unit)
                    .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.") });

            if (!business_unit_exist) throw new BusinessUnitError("La unidad de negocio no existe.");
            const new_school = {
                id: UniqueID.generate(),
                name: school.name,
                nickname: school.nickname,
                code: school.code,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                business_unit_id: school.business_unit_id,
                user_id: access.user_id,
            }
            const [_school, created] = await SchoolModel.findOrCreate({
                    where: {
                        [Op.or] : [
                            {name: school.name},
                            {nickname: school.nickname},
                            {code: school.code},
                        ]
                    },
                    defaults: new_school,
                })
                .then(school => school)
                .catch(_error => { throw new SchoolError("Ha ocurrido un error al tratar de crear la escuela profesional.")});

            if (!created) throw new SchoolError("La escuela profesional ya existe.");

            return SchoolPresenter(new_school, access, business_unit_exist.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new SchoolError(error.message);
            else throw new Error("Ha ocurrido un error al crear la escuela profesional.");
        }
    }
    async update(access: IAccessPermission, id: string, school: School): Promise<ISchoolResponse> {
        try {
            let business_unit;
            const school_exist = access.super_admin === true ?
                await SchoolModel.findOne({ 
                        where: { id: id },
                        include: [{ model: BusinessUnitModel }]
                    })
                    .then(school => school)
                    .catch((_error) => { throw new SchoolError("Ha ocurrido un error al revisar la escuela profesional.") }) :
                await SchoolModel.findOne({ 
                        where: { id: id, user_id: access.user_id },
                        include: [{ model: BusinessUnitModel }]
                    })
                    .then(school => school)
                    .catch((_error) => { throw new SchoolError("Ha ocurrido un error al revisar la escuela profesional.") });

            if (!school_exist) throw new SchoolError("La escuela profesional no existe.");

            const school_coincidence = (school.name !== school_exist.dataValues.name || school.nickname !== school_exist.dataValues.nickname || school.code !== school_exist.dataValues.code || school.business_unit_id !== school_exist.dataValues.business_unit_id) ? 
                await SchoolModel.findAll({
                        where: {
                            [Op.and]: [
                                {
                                    [Op.or]: [
                                        {name: school.name},
                                        {nickname: school.nickname},
                                        {code: school.code},
                                    ]
                                },
                                ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                                { id: { [Op.ne]: id } }
                            ]
                        }
                    })
                    .then(schools => schools)
                    .catch((_error) => { throw new SchoolError("Ha ocurrido un error al revisar las escuela profesionales.") }) : [];

            if (school_coincidence.length > 0) throw new SchoolError("Ya existe una escuela profesional con los datos proporcionados.");

            business_unit = school.business_unit_id !== school_exist.dataValues.business_unit_id ?
                await BusinessUnitModel.findOne({
                        where: [
                            { id: school.business_unit_id },
                            ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                        ]
                    })
                    .then(business_unit => business_unit)
                    .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.") }) :
                school_exist.dataValues.business_unit;

            school_exist.set({
                name: school.name ?? school_exist.dataValues.name,
                nickname: school.nickname ?? school_exist.dataValues.nickname,
                code: school.code ?? school_exist.dataValues.code,
                hidden: school.hidden ?? school_exist.dataValues.hidden,
                business_unit_id: business_unit.dataValues.id,
                updatedAt: Date.now(),
            });

            const updated = await school_exist.save()
                .then(school => school)
                .catch((_error) => { throw new SchoolError("Ha ocurrido un error al tratar de actualizar la escuela profesional.") });

            return SchoolPresenter(updated.dataValues, access, business_unit.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new SchoolError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar la escuela profesional.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const school_exist = access.super_admin === true ?
                await SchoolModel.findOne({ where: { id: id } })
                    .then(school => school)
                    .catch((_error) => { throw new SchoolError("Ha ocurrido un error al revisar la escuela profesional.") }) :
                await SchoolModel.findOne({ where: { id: id, user_id: access.user_id } })
                    .then(school => school)
                    .catch((_error) => { throw new SchoolError("Ha ocurrido un error al revisar la escuela profesional.") });

            if (!school_exist) throw new SchoolError("La escuela profesional no existe.");

            const careers_affected = await CareerModel.count({ where: { school_id: id } })
                .then(count => count)
                .catch((_error) => { throw new SchoolError("Ha ocurrido un error al obtener las carreras afectadas.") });

            school_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });

            await school_exist.save().catch((_error) => { throw new SchoolError("Ha ocurrido un error al tratar de eliminar la escuela profesional.") });
            return `La escuela profesional ha sido eliminada. ${careers_affected ? `${careers_affected} carreras han sido afectadas.` : ""}`
        } catch (error) {
            if (error instanceof Error && error.message) throw new SchoolError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar la escuela profesional.");
        }
    }
    async findByBusinessUnitId(access: IAccessPermission, business_unit_id: string): Promise<ISchoolResponse[]> {
        try {
            const schools = access.super_admin === true ? 
                await SchoolModel.findAll({ 
                        where: { business_unit_id: business_unit_id },
                        include: [{ model: BusinessUnitModel }]
                    })
                    .then(schools => schools)
                    .catch((_error) => { throw new SchoolError("Ha ocurrido un error al obtener las escuelas profesionales.") }) :
                await SchoolModel.findAll({ 
                        where: [
                            { business_unit_id: business_unit_id, user_id: access.user_id },
                            ListCondition(access)
                        ],
                        include: [{ model: BusinessUnitModel }]
                    })
                    .then(schools => schools)
                    .catch((_error) => { throw new SchoolError("Ha ocurrido un error al obtener las escuelas profesionales.") });

            return schools.map(school => SchoolPresenter(school.dataValues, access, school.dataValues.business_unit.dataValues));
        } catch (error) {
            if (error instanceof Error && error.message) throw new SchoolError(error.message);
            else throw new Error("Ha ocurrido un error al obtener las escuelas profesionales.");
        }
    }
    async findAll(access: IAccessPermission): Promise<ISchoolResponse[]> {
        try {
            const schools = access.super_admin === true ? 
                await SchoolModel.findAll({
                        include: [{ model: BusinessUnitModel }]
                    })
                    .then(schools => schools)
                    .catch((_error) => { throw new SchoolError("Ha ocurrido un error al obtener las escuelas profesionales.") }) :
                await SchoolModel.findAll({ 
                        where: [
                            { user_id: access.user_id },
                            ListCondition(access)
                        ],
                        include: [{ model: BusinessUnitModel }]
                    })
                    .then(schools => schools)
                    .catch((_error) => { throw new SchoolError("Ha ocurrido un error al obtener las escuelas profesionales.") });

            return schools.map(school => SchoolPresenter(school.dataValues, access, school.dataValues.business_unit.dataValues));
        } catch (error) {
            if (error instanceof Error && error.message) throw new SchoolError(error.message);
            else throw new Error("Ha ocurrido un error al obtener las escuelas profesionales.");
        }
    }
}
const schoolDao = new SchoolDao();
export default schoolDao;