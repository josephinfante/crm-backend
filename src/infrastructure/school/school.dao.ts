import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { School } from "../../domain/school/school";
import { ISchoolResponse, SchoolPresenter } from "../../interfaces/presenters/school.presenter";
import { SchoolError } from "../../shared/errors";
import { UniqueID } from "../../shared/utils";
import { CareerModel } from "../../shared/models/career.model";
import { SchoolModel } from "../../shared/models";

class SchoolDao {
    async create(access: IAccessPermission, school: School): Promise<ISchoolResponse> {
        try {
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

            return SchoolPresenter(new_school, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new SchoolError(error.message);
            else throw new Error("Ha ocurrido un error al crear la escuela profesional.");
        }
    }
    async update(access: IAccessPermission, id: string, school: School): Promise<ISchoolResponse> {
        try {
            const school_exist = access.super_admin === true ?
                await SchoolModel.findOne({ where: { id: id } })
                    .then(school => school)
                    .catch((_error) => { throw new SchoolError("Ha ocurrido un error al revisar la escuela profesional.") }) :
                await SchoolModel.findOne({ where: { id: id, user_id: access.user_id } })
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
                                ...(school.business_unit_id !== school_exist.dataValues.business_unit_id ? [{ business_unit_id: school.business_unit_id }] : [{ business_unit_id: { [Op.ne]: school.business_unit_id }}]),
                                { id: { [Op.ne]: id } }
                            ]
                        }
                    })
                    .then(schools => schools)
                    .catch((_error) => { throw new SchoolError("Ha ocurrido un error al revisar las escuela profesionales.") }) : [];

            if (school_coincidence.length > 0) throw new SchoolError("Ya existe una escuela profesional con los datos proporcionados.");

            school_exist.set({
                name: school.name ?? school_exist.dataValues.name,
                nickname: school.nickname ?? school_exist.dataValues.nickname,
                code: school.code ?? school_exist.dataValues.code,
                hidden: school.hidden ?? school_exist.dataValues.hidden,
                business_unit_id: school.business_unit_id !== school_exist.dataValues.business_unit_id ? school.business_unit_id : school_exist.dataValues.business_unit_id,
                updatedAt: Date.now(),
            });

            const updated = await school_exist.save()
                .then(school => school)
                .catch((_error) => { throw new SchoolError("Ha ocurrido un error al tratar de actualizar la escuela profesional.") });

            return SchoolPresenter(updated.dataValues, access);
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
                await SchoolModel.findAll({ where: { business_unit_id: business_unit_id } })
                    .then(schools => schools)
                    .catch((_error) => { throw new SchoolError("Ha ocurrido un error al obtener las escuelas profesionales.") }) :
                await SchoolModel.findAll({ where: { business_unit_id: business_unit_id, user_id: access.user_id } })
                    .then(schools => schools)
                    .catch((_error) => { throw new SchoolError("Ha ocurrido un error al obtener las escuelas profesionales.") });

            return schools.map(school => SchoolPresenter(school.dataValues, access));
        } catch (error) {
            if (error instanceof Error && error.message) throw new SchoolError(error.message);
            else throw new Error("Ha ocurrido un error al obtener las escuelas profesionales.");
        }
    }
}
const schoolDao = new SchoolDao();
export default schoolDao;