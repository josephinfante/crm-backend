import { Op, WhereOptions } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { College } from "../../domain/college/college";
import { CollegeModel, ContactDegreeModel } from "../../shared/models";
import { UniqueID, ListCondition } from "../../shared/utils";
import { CollegeError } from "../../shared/errors";
import { CollegePresenter, ICollegeResponse } from "../../interfaces/presenters/college.presenter";

class CollegeDao {
    async create(access: IAccessPermission, college: College): Promise<ICollegeResponse> {
        try {
            const new_college = {
                id: UniqueID.generate(),
                name: college.name,
                code: college.code,
                type: college.type,
                class: college.class,
                level: college.level,
                board: college.board,
                is_competitor: college.is_competitor,
                priority: college.priority,
                hidden: false,
                deleted: false,
                updatedAt: Date.now(),
                createdAt: Date.now(),
                user_id: access.user_id,
            }
            const [_college, created] = await CollegeModel.findOrCreate({
                    where: {
                        [Op.and]: [
                            {
                                [Op.or]: [
                                    { name: college.name },
                                    { code: college.code }
                                ]
                            },
                            { user_id: access.user_id }
                        ]
                    },
                    defaults: new_college
                })
                .then(college => college)
                .catch((_error) => { throw new CollegeError("Ha ocurrido un error al tratar de crear la institución educativa.") });

            if (!created) throw new CollegeError("La institución educativa ya existe.");
            return CollegePresenter(new_college, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new CollegeError(error.message);
            else throw new Error("Ha ocurrido un error al crear la institución educativa.");
        }
    }
    async update(access: IAccessPermission, id: string, college: College): Promise<ICollegeResponse> {
        try {
            const college_exist = access.super_admin === true ?
                await CollegeModel.findOne({ where: { id } })
                    .then(college => college)
                    .catch((_error) => { throw new CollegeError("Ha ocurrido un error al revisar la institución educativa.") }) :
                await CollegeModel.findOne({ where: { id, user_id: access.user_id } })
                    .then(college => college)
                    .catch((_error) => { throw new CollegeError("Ha ocurrido un error al revisar la institución educativa.") });

            if (!college_exist) throw new CollegeError("La institución educativa no existe.");

            const college_coincidence = await CollegeModel.findAll({
                    where: {
                        [Op.and]: [
                            {
                                [Op.or]: [
                                    { name: college.name },
                                    { code: college.code }
                                ]
                            },
                            ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                            { id: { [Op.ne]: id } }
                        ]
                    }
                })
                .then(colleges => colleges)
                .catch((_error) => { throw new CollegeError("Ha ocurrido un error al revisar las instituciones educativas.") });

            if (college_coincidence.length > 0) throw new CollegeError("Ya existe una institución educativa con el mismo nombre o código.");

            college_exist.set({
                name: college.name ?? college_exist.dataValues.name,
                code: college.code ?? college_exist.dataValues.code,
                type: college.type ?? college_exist.dataValues.type,
                class: college.class ?? college_exist.dataValues.class,
                level: college.level ?? college_exist.dataValues.level,
                board: college.board ?? college_exist.dataValues.board,
                is_competitor: college.is_competitor ?? college_exist.dataValues.is_competitor,
                priority: college.priority ?? college_exist.dataValues.priority,
                hidden: college.hidden ?? college_exist.dataValues.hidden,
                updatedAt: Date.now(),
            })
            const updated = await college_exist.save()
                .then(college => college)
                .catch((_error) => { throw new CollegeError("Ha ocurrido un error al tratar de actualizar la institución educativa.") });

            return CollegePresenter(updated.dataValues, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new CollegeError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar la institución educativa.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string> {
        try {
            const college_exist = access.super_admin === true ?
                await CollegeModel.findOne({ where: { id } })
                    .then(college => college)
                    .catch((_error) => { throw new CollegeError("Ha ocurrido un error al revisar la institución educativa.") }) :
                await CollegeModel.findOne({ where: { id, user_id: access.user_id } })
                    .then(college => college)
                    .catch((_error) => { throw new CollegeError("Ha ocurrido un error al revisar la institución educativa.") });

            if (!college_exist) throw new CollegeError("La institución educativa no existe.");

            const contacts_affected = await ContactDegreeModel.count({
                    where: { college_id: id },
                })
                .then(count => count)
                .catch((_error) => { throw new CollegeError("Ha ocurrido un error al obtener los contactos afectados.") });

            college_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            })

            await college_exist.save().catch((_error) => { throw new CollegeError("Ha ocurrido un error al tratar de eliminar la institución educativa.") });

            return `La institución educativa ha sido eliminado. ${contacts_affected ? `${contacts_affected} contactos han sido afectados.` : ""}`;
        } catch (error) {
            if (error instanceof Error && error.message) throw new CollegeError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar la institución educativa.");
        }
    }
    async findAll(access: IAccessPermission, college?: string): Promise<ICollegeResponse[]> {
        try {
            const whereCondition: Record<string, any> = { user_id: access.user_id };

            if (access.super_admin === true) {
                delete whereCondition.user_id;
            }

            let nameOrCodeCondition: WhereOptions = {};

            if (college) {
                const collegeCondition = {
                    [Op.or]: [
                        { name: { [Op.like]: `%${college}%` } },
                        { code: { [Op.like]: `%${college}%` } },
                    ],
                };

                nameOrCodeCondition = collegeCondition;
            }

            const colleges = await CollegeModel.findAll({
                where: {
                    ...whereCondition,
                    ...nameOrCodeCondition,
                },
                ...ListCondition(access),
            });

            return colleges.map(college => CollegePresenter(college.dataValues, access));
        } catch (error) {
            if (error instanceof Error && error.message) throw new CollegeError(error.message);
            else throw new Error("Ha ocurrido un error al buscar las instituciones educativas.");
        }
    }
}
const collegeDao = new CollegeDao();
export default collegeDao;