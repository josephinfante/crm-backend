import { Op, WhereOptions } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { Degree } from "../../domain/degree/degree";
import { ListCondition, UniqueID } from "../../shared/utils";
import { DegreeError, DegreeSpecificationError } from "../../shared/errors";
import { DegreePresenter, IDegreeResponse } from "../../interfaces/presenters/degree.presenter";
import { ContactDegreeModel, DegreeModel, DegreeSpecificationModel } from "../../shared/models";

class DegreeDao {
    async create(access: IAccessPermission, degree: Degree): Promise<IDegreeResponse> {
        try {
            const new_degree = {
                id: UniqueID.generate(),
                name: degree.name,
                code: degree.code,
                hidden: false,
                deleted: false,
                updatedAt: Date.now(),
                createdAt: Date.now(),
                user_id: access.user_id,
            }

            const [_degree, created] = await DegreeModel.findOrCreate({
                    where: {
                        [Op.and]: [
                            {
                                [Op.or]: [
                                    { name: degree.name },
                                    { code: degree.code },
                                ]
                            },
                            { user_id: access.user_id }
                        ],
                    },
                    defaults: new_degree,
                })
                .then(degree => degree)
                .catch((_error) => { throw new DegreeError("Ha ocurrido un error al tratar de crear el grado académico.") });
            if (!created) throw new DegreeError("Ya existe un grado académico con el código o nombre proporcinado.");
            return DegreePresenter(new_degree, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new DegreeError(error.message);
            else throw new Error("Ha ocurrido un error al crear el grado académico.");
        }
    }
    async update(access: IAccessPermission, id: string, degree: Degree): Promise<IDegreeResponse> {
        try {
            const degree_exist = access.super_admin === true ? 
                await DegreeModel.findOne({ where: { id: id } })
                    .then(degree => degree)
                    .catch((_error) => { throw new DegreeError("Ha ocurrido un error al revisar el grado académico.") }) : 
                await DegreeModel.findOne({ where: { id: id, user_id: access.user_id} })
                    .then(degree => degree)
                    .catch((_error) => { throw new DegreeError("Ha ocurrido un error al revisar el grado académico.") });
            
            if (!degree_exist) throw new DegreeError(`El grado académico con ID ${id} no existe.`);

            const degree_coincidence = await DegreeModel.findAll({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                { name: degree.name },
                                { code: degree.code },
                            ]
                        },
                        ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                        { id: { [Op.ne]: id } }
                    ]
                }
            });

            if (degree_coincidence.length > 0) throw new DegreeError("Ya existe un grado académico con el código o nombre proporcinado.");

            degree_exist.set({
                name: degree.name ?? degree_exist.dataValues.name,
                code: degree.code ?? degree_exist.dataValues.code,
                hidden: degree.hidden ?? degree_exist.dataValues.hidden,
                updatedAt: Date.now(),
            });
            const updated = await degree_exist.save()
                .then(degree => degree)
                .catch((_error) => { throw new DegreeError("Ha ocurrido un error al tratar de actualizar el grado académico.") });
            return DegreePresenter(updated.dataValues, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new DegreeError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar el grado académico.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string> {
        try {
            const degree_exist = access.super_admin === true ? 
                await DegreeModel.findOne({ where: { id: id } })
                    .then(degree => degree)
                    .catch((_error) => { throw new DegreeError("Ha ocurrido un error al revisar el grado académico.") }) : 
                await DegreeModel.findOne({ where: { id: id, user_id: access.user_id} })
                    .then(degree => degree)
                    .catch((_error) => { throw new DegreeError("Ha ocurrido un error al revisar el grado académico.") });
            
            if (!degree_exist) throw new DegreeError(`El grado académico con ID ${id} no existe.`);

            const contacts_affected = await DegreeSpecificationModel.findOne({ 
                    where: { degree_id: id },
                    attributes: ["id"],
                }).then(degree_specification => {
                    if (!degree_specification) return null;
                    return ContactDegreeModel.count({
                        where : { degree_specification_id: degree_specification.dataValues.id}
                    })
                }).then(count => count)
                .catch((_error) => { throw new DegreeSpecificationError("Ha ocurrido un error al obtener los contactos afectados.") });

            degree_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });
            await degree_exist.save().catch((_error) => { throw new DegreeError("Ha ocurrido un error al eliminar el grado académico.") });

            return `El grado académico ha sido eliminado. ${contacts_affected ? `${contacts_affected} contactos han sido afectados.` : ""}`;
        } catch (error) {
            if (error instanceof Error && error.message) throw new DegreeError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar el grado académico.");
        }
    }
    async findById(access: IAccessPermission, id: string): Promise<IDegreeResponse> {
        try {
            const degree_exist = access.super_admin === true ? 
                await DegreeModel.findOne({ where: { id: id } })
                    .then(degree => degree)
                    .catch((_error) => { throw new DegreeError("Ha ocurrido un error al revisar el grado académico.") }) : 
                await DegreeModel.findOne({ where: { id: id, user_id: access.user_id} })
                    .then(degree => degree)
                    .catch((_error) => { throw new DegreeError("Ha ocurrido un error al revisar el grado académico.") });
            
            if (!degree_exist) throw new DegreeError(`El grado académico con ID ${id} no existe.`);

            const degree_specifications = access.super_admin === true ?
                await DegreeSpecificationModel.findAll({ where: { degree_id: id } })
                    .then(degree_specifications => degree_specifications)
                    .catch((_error) => { throw new DegreeSpecificationError("Ha ocurrido un error al obtener las especificaciones de grado.") }) :
                await DegreeSpecificationModel.findAll({ where: { degree_id: id, user_id: access.user_id } })
                    .then(degree_specifications => degree_specifications)
                    .catch((_error) => { throw new DegreeSpecificationError("Ha ocurrido un error al obtener las especificaciones de grado.") });

            return DegreePresenter(degree_exist.dataValues, access, degree_specifications as any);
        } catch (error) {
            if (error instanceof Error && error.message) throw new DegreeError(error.message);
            else throw new Error("Ha ocurrido un error al obtener el grado académico.");
        }
    }
    async findAll(access: IAccessPermission, degree?: string): Promise<IDegreeResponse[]> {
        try {
            const whereCondition: Record<string, any> = { user_id: access.user_id };

            if (access.super_admin === true) {
                delete whereCondition.user_id;
            }

            let nameOrCodeCondition: WhereOptions = {};

            if (degree) {
                const degreeCondition = {
                    [Op.or]: [
                        { name: { [Op.like]: `%${degree}%` } },
                        { code: { [Op.like]: `%${degree}%` } },
                    ],
                };

                nameOrCodeCondition = degreeCondition;
            }

            const degrees = await DegreeModel.findAll({
                where: {
                    ...whereCondition,
                    ...nameOrCodeCondition,
                },
                ...ListCondition(access),
            });

            return degrees.map(degree => DegreePresenter(degree.dataValues, access));
        } catch (error) {
            if (error instanceof Error && error.message) throw new DegreeError(error.message);
            else throw new Error("Ha ocurrido un error al obtener los grados académicos.");
        }
    }
}
const degreeDao = new DegreeDao();
export default degreeDao;