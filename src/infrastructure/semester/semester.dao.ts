import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { UniqueID } from "../../shared/utils";
import { ISemesterResponse, SemesterPresenter } from "../../interfaces/presenters/semester.presenter";
import { Semester } from "../../domain/semester/semester";
import { SemesterModel } from "../../shared/models";
import { SemesterError } from "../../shared/errors";

class SemesterDao {
    async create(access: IAccessPermission, semester: Semester): Promise<ISemesterResponse> {
        try {
            const new_semester = {
                id: UniqueID.generate(),
                name: semester.name,
                nickname: semester.nickname,
                code: semester.code,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                business_unit_id: semester.business_unit_id,
                user_id: access.user_id,
            }
            const [_semester, created] = await SemesterModel.findOrCreate({
                    where: {
                        [Op.or] : [
                            {name: semester.name},
                            {nickname: semester.nickname},
                            {code: semester.code},
                        ]
                    },
                    defaults: new_semester,
                })
                .then(semester => semester)
                .catch(_error => { throw new SemesterError("Ha ocurrido un error al tratar de crear el semestre académico.")});

            if (!created) throw new SemesterError("El semestre académico ya existe.");

            return SemesterPresenter(new_semester, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new SemesterError(error.message);
            else throw new Error("Ha ocurrido un error al crear el semestre académico.");
        }
    }
    async update(access: IAccessPermission, id: string, semester: Semester): Promise<ISemesterResponse> {
        try {
            const semester_exist = access.super_admin === true ?
                await SemesterModel.findOne({ where: { id: id } })
                    .then(semester => semester)
                    .catch((_error) => { throw new SemesterError("Ha ocurrido un error al revisar el semestre académico.") }) :
                await SemesterModel.findOne({ where: { id: id, user_id: access.user_id } })
                    .then(semester => semester)
                    .catch((_error) => { throw new SemesterError("Ha ocurrido un error al revisar el semestre académico.") });

            if (!semester_exist) throw new SemesterError("el semestre académico no existe.");

            const semester_coincidence = (semester.name !== semester_exist.dataValues.name || semester.nickname !== semester_exist.dataValues.nickname || semester.code !== semester_exist.dataValues.code || semester.business_unit_id !== semester_exist.dataValues.business_unit_id) ? 
                await SemesterModel.findAll({
                        where: {
                            [Op.and]: [
                                {
                                    [Op.or]: [
                                        {name: semester.name},
                                        {nickname: semester.nickname},
                                        {code: semester.code},
                                    ]
                                },
                                ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                                ...(semester.business_unit_id !== semester_exist.dataValues.business_unit_id ? [{ business_unit_id: semester.business_unit_id }] : [{ business_unit_id: { [Op.ne]: semester.business_unit_id }}]),
                                { id: { [Op.ne]: id } }
                            ]
                        }
                    })
                    .then(semesters => semesters)
                    .catch((_error) => { throw new SemesterError("Ha ocurrido un error al revisar las sedes.") }) : [];

            if (semester_coincidence.length > 0) throw new SemesterError("Ya existe una sede con los datos proporcionados.");

            semester_exist.set({
                name: semester.name ?? semester_exist.dataValues.name,
                nickname: semester.nickname ?? semester_exist.dataValues.nickname,
                code: semester.code ?? semester_exist.dataValues.code,
                hidden: semester.hidden ?? semester_exist.dataValues.hidden,
                business_unit_id: semester.business_unit_id !== semester_exist.dataValues.business_unit_id ? semester.business_unit_id : semester_exist.dataValues.business_unit_id,
                updatedAt: Date.now(),
            });

            const updated = await semester_exist.save()
                .then(semester => semester)
                .catch((_error) => { throw new SemesterError("Ha ocurrido un error al tratar de actualizar el semestre académico.") });

            return SemesterPresenter(updated.dataValues, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new SemesterError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar el semestre académico.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const semester_exist = access.super_admin === true ?
                await SemesterModel.findOne({ where: { id: id } })
                    .then(semester => semester)
                    .catch((_error) => { throw new SemesterError("Ha ocurrido un error al revisar el semestre académico.") }) :
                await SemesterModel.findOne({ where: { id: id, user_id: access.user_id } })
                    .then(semester => semester)
                    .catch((_error) => { throw new SemesterError("Ha ocurrido un error al revisar el semestre académico.") });

            if (!semester_exist) throw new SemesterError("el semestre académico no existe.");

            semester_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });

            await semester_exist.save().catch((_error) => { throw new SemesterError("Ha ocurrido un error al tratar de eliminar el semestre académico.") });
        } catch (error) {
            if (error instanceof Error && error.message) throw new SemesterError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar el semestre académico.");
        }
    }
    async findByBusinessUnitId(access: IAccessPermission, business_unit_id: string): Promise<ISemesterResponse[]> {
        try {
            const semesters = access.super_admin === true ? 
                await SemesterModel.findAll({ where: { business_unit_id: business_unit_id } })
                    .then(semesters => semesters)
                    .catch((_error) => { throw new SemesterError("Ha ocurrido un error al obtener las sedes.") }) :
                await SemesterModel.findAll({ where: { business_unit_id: business_unit_id, user_id: access.user_id } })
                    .then(semesters => semesters)
                    .catch((_error) => { throw new SemesterError("Ha ocurrido un error al obtener las sedes.") });

            return semesters.map(semester => SemesterPresenter(semester.dataValues, access));
        } catch (error) {
            if (error instanceof Error && error.message) throw new SemesterError(error.message);
            else throw new Error("Ha ocurrido un error al obtener las sedes.");
        }
    }
}
const semesterDao = new SemesterDao();
export default semesterDao;