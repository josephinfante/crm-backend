import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { ListCondition, UniqueID } from "../../shared/utils";
import { CareerPresenter, ICareerResponse } from "../../interfaces/presenters/career.presenter";
import { Career } from "../../domain/career/career";
import { CareerError, SchoolError } from "../../shared/errors";
import { CareerModel, SchoolModel } from "../../shared/models";

class CareerDao {
    async create(access: IAccessPermission, career: Career): Promise<ICareerResponse> {
        try {
            const school_exist = access.super_admin === true ?
                await SchoolModel.findByPk(career.school_id)
                    .then(school => school)
                    .catch((_error) => { throw new SchoolError("Ha ocurrido un error al revisar la escuela.") }) :
                await SchoolModel.findOne({ 
                        where: { id: career.school_id, user_id: access.user_id }
                    })
                    .then(school => school)
                    .catch((_error) => { throw new SchoolError("Ha ocurrido un error al revisar la escuela.") });

            if (!school_exist) throw new SchoolError("La escuela no existe.");

            const new_career = {
                id: UniqueID.generate(),
                name: career.name,
                nickname: career.nickname,
                code: career.code,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                school_id: career.school_id,
                user_id: access.user_id,
            }
            const [_career, created] = await CareerModel.findOrCreate({
                    where: {
                        [Op.or] : [
                            {name: career.name},
                            {nickname: career.nickname},
                            {code: career.code},
                        ]
                    },
                    defaults: new_career,
                })
                .then(career => career)
                .catch(_error => { throw new CareerError("Ha ocurrido un error al tratar de crear la carrera.")});

            if (!created) throw new CareerError("La carrera ya existe.");

            return CareerPresenter(new_career, access, school_exist.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new CareerError(error.message);
            else throw new Error("Ha ocurrido un error al crear la carrera.");
        }
    }
    async update(access: IAccessPermission, id: string, career: Career): Promise<ICareerResponse> {
        try {
            let school;
            const career_exist = access.super_admin === true ?
                await CareerModel.findOne({ 
                        where: { id: id },
                        include: [{ model: SchoolModel }]
                    })
                    .then(career => career)
                    .catch((_error) => { throw new CareerError("Ha ocurrido un error al revisar la carrera.") }) :
                await CareerModel.findOne({ 
                        where: { id: id, user_id: access.user_id },
                        include: [{ model: SchoolModel }]
                    })
                    .then(career => career)
                    .catch((_error) => { throw new CareerError("Ha ocurrido un error al revisar la carrera.") });

            if (!career_exist) throw new CareerError("la carrera no existe.");

            const career_coincidence = (career.name !== career_exist.dataValues.name || career.nickname !== career_exist.dataValues.nickname || career.code !== career_exist.dataValues.code || career.school_id !== career_exist.dataValues.school_id) ? 
                await CareerModel.findAll({
                        where: {
                            [Op.and]: [
                                {
                                    [Op.or]: [
                                        {name: career.name},
                                        {nickname: career.nickname},
                                        {code: career.code},
                                    ]
                                },
                                ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                                { id: { [Op.ne]: id } }
                            ]
                        }
                    })
                    .then(careers => careers)
                    .catch((_error) => { throw new CareerError("Ha ocurrido un error al revisar las carreras.") }) : [];

            if (career_coincidence.length > 0) throw new CareerError("Ya existe una carrera con los datos proporcionados.");

            school = career.school_id !== career_exist.dataValues.school_id ?
                await SchoolModel.findOne({
                        where: [
                            { id: career.school_id },
                            ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                        ]
                    })
                    .then(school => school)
                    .catch((_error) => { throw new SchoolError("Ha ocurrido un error al revisar la escuela.") }) :
                career_exist.dataValues.school;

            career_exist.set({
                name: career.name ?? career_exist.dataValues.name,
                nickname: career.nickname ?? career_exist.dataValues.nickname,
                code: career.code ?? career_exist.dataValues.code,
                hidden: career.hidden ?? career_exist.dataValues.hidden,
                school_id: school.dataValues.id,
                updatedAt: Date.now(),
            });

            const updated = await career_exist.save()
                .then(career => career)
                .catch((_error) => { throw new CareerError("Ha ocurrido un error al tratar de actualizar la carrera.") });

            return CareerPresenter(updated.dataValues, access, school.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new CareerError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar la carrera.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const career_exist = access.super_admin === true ?
                await CareerModel.findOne({ where: { id: id } })
                    .then(career => career)
                    .catch((_error) => { throw new CareerError("Ha ocurrido un error al revisar la carrera.") }) :
                await CareerModel.findOne({ where: { id: id, user_id: access.user_id } })
                    .then(career => career)
                    .catch((_error) => { throw new CareerError("Ha ocurrido un error al revisar la carrera.") });

            if (!career_exist) throw new CareerError("la carrera no existe.");

            career_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });

            await career_exist.save().catch((_error) => { throw new CareerError("Ha ocurrido un error al tratar de eliminar la carrera.") });
        } catch (error) {
            if (error instanceof Error && error.message) throw new CareerError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar la carrera.");
        }
    }
    async findBySchoolId(access: IAccessPermission, school_id: string): Promise<ICareerResponse[]> {
        try {
            const careers = access.super_admin === true ? 
                await CareerModel.findAll({ 
                        where: { school_id: school_id },
                        include: [{ model: SchoolModel }]
                    })
                    .then(careers => careers)
                    .catch((_error) => { throw new CareerError("Ha ocurrido un error al tratar de obtener las carreras.") }) :
                await CareerModel.findAll({ 
                        where: [
                            { school_id: school_id, user_id: access.user_id },
                            ListCondition(access),
                        ],
                        include: [{ model: SchoolModel }]
                    })
                    .then(careers => careers)
                    .catch((_error) => { throw new CareerError("Ha ocurrido un error al tratar de obtener las carreras.") });

            return careers.map(career => CareerPresenter(career.dataValues, access, career.dataValues.school.dataValues));
        } catch (error) {
            if (error instanceof Error && error.message) throw new CareerError(error.message);
            else throw new Error("Ha ocurrido un error al obtener las carreras.");
        }
    }
    async findAll(access: IAccessPermission): Promise<ICareerResponse[]> {
        try {
            const careers = access.super_admin === true ? 
                await CareerModel.findAll({
                        include: [{ model: SchoolModel }]
                    })
                    .then(careers => careers)
                    .catch((_error) => { throw new CareerError(_error.message??"Ha ocurrido un error al tratar de obtener las carreras.") }) :
                await CareerModel.findAll({ 
                        where: [
                            { user_id: access.user_id },
                            ListCondition(access),
                        ],
                        include: [{ model: SchoolModel }]
                    })
                    .then(careers => careers)
                    .catch((_error) => { throw new CareerError("Ha ocurrido un error al tratar de obtener las carreras.") });

            return careers.map(career => CareerPresenter(career.dataValues, access, career.dataValues.school.dataValues));
        } catch (error) {
            if (error instanceof Error && error.message) throw new CareerError(error.message);
            else throw new Error("Ha ocurrido un error al obtener las carreras.");
        }
    }
}
const careerDao = new CareerDao();
export default careerDao;