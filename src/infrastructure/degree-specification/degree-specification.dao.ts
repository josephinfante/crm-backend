import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { DegreeSpecification } from "../../domain/degree-specification/degree-specification";
import { ContactDegreeModel, DegreeSpecificationModel } from "../../shared/models";
import { ListCondition, UniqueID } from "../../shared/utils";
import { ContactDegreeError, DegreeSpecificationError } from "../../shared/errors";
import { DegreespecificationPresenter, IDegreeSpecificationResponse } from "../../interfaces/presenters/degree-specification.presenter";

class DegreespecificationDao {
    async create(access: IAccessPermission, degree_specification: DegreeSpecification): Promise<IDegreeSpecificationResponse> {
        try {
            const new_degree_specification = {
                id: UniqueID.generate(),
                name: degree_specification.name,
                code: degree_specification.code,
                hidden: false,
                deleted: false,
                updatedAt: Date.now(),
                createdAt: Date.now(),
                user_id: access.user_id,
                degree_id: degree_specification.degree_id,
            }

            const [_degree_specification, created] = await DegreeSpecificationModel.findOrCreate({
                    where: {
                        [Op.and]: [
                            {
                                [Op.or]: [
                                    { name: degree_specification.name },
                                    { code: degree_specification.code },
                                ]
                            },
                            { degree_id: degree_specification.degree_id}
                        ]
                    },
                    defaults: new_degree_specification
                })
                .then(degree_specification => degree_specification)
                .catch((_error) => { throw new DegreeSpecificationError("Ha ocurrido un error al tratar de crear la especificación del grado académico.") })

            if (!created) throw new DegreeSpecificationError("Ya existe una especificación del grado académico con el mismo nombre o código.");

            return DegreespecificationPresenter(new_degree_specification, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new DegreeSpecificationError(error.message);
            else throw new Error("Ha ocurrido un error al crear la especificación del grado académico.");
        }
    }
    async update(access: IAccessPermission, id: string, degree_specification: DegreeSpecification): Promise<IDegreeSpecificationResponse> {
        try {
            const degree_specification_exist = access.super_admin === true ? 
                await DegreeSpecificationModel.findOne({ where: { id: id } })
                    .then(degree_specification => degree_specification)
                    .catch((_error) => { throw new DegreeSpecificationError("Ha ocurrido un error al revisar la especificación del grado académico.") }) : 
                await DegreeSpecificationModel.findOne({ where: { id: id, user_id: access.user_id} })
                    .then(degree_specification => degree_specification)
                    .catch((_error) => { throw new DegreeSpecificationError("Ha ocurrido un error al revisar la especificación del grado académico.") });
            
            if (!degree_specification_exist) throw new DegreeSpecificationError(`La especificación del grado académico con ID ${id} no existe.`);

            const degree_specification_coincidence = await DegreeSpecificationModel.findAll({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                { name: degree_specification.name },
                                { code: degree_specification.code },
                            ]
                        },
                        ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                        { id: { [Op.ne]: id } }
                    ]
                }
            })

            if (degree_specification_coincidence.length > 0) throw new DegreeSpecificationError("Ya existe una especificación del grado académico con el mismo nombre o código.");

            degree_specification_exist.set({
                name: degree_specification.name ?? degree_specification_exist.dataValues.name,
                code: degree_specification.code ?? degree_specification_exist.dataValues.code,
                hidden: degree_specification.hidden ?? degree_specification_exist.dataValues.hidden,
                updatedAt: Date.now(),
            });
            const updated = await degree_specification_exist.save()
                .then(degree_specification => degree_specification)
                .catch((_error) => {throw new DegreeSpecificationError("Ha ocurrido un error al tratar de actualizar la especificación del grado académico.") });
            return DegreespecificationPresenter(updated.dataValues, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new DegreeSpecificationError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar la especificación del grado académico.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string> {
        try {
            const degree_specification_exist = access.super_admin === true ? 
                await DegreeSpecificationModel.findOne({ where: { id: id } })
                    .then(degree_specification => degree_specification)
                    .catch((_error) => { throw new DegreeSpecificationError("Ha ocurrido un error al revisar la especificación del grado académico.") }) : 
                await DegreeSpecificationModel.findOne({ where: { id: id, user_id: access.user_id} })
                    .then(degree_specification => degree_specification)
                    .catch((_error) => { throw new DegreeSpecificationError("Ha ocurrido un error al revisar la especificación del grado académico.") });
            
            if (!degree_specification_exist) throw new DegreeSpecificationError(`La especificación del grado académico con ID ${id} no existe.`);

            const contacts_affected = await ContactDegreeModel.count({
                    where: {degree_specification_id: id}
                })
                .then(count => count)
                .catch((_error) => { throw new ContactDegreeError("Ha ocurrido un error al obtener los contactos afectados.") });

            degree_specification_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });
            await degree_specification_exist.save()
                .catch((_error) => { throw new DegreeSpecificationError("Ha ocurrido un error al tratar de eliminar la especificación del grado académico.") });

            return `La especificación del grado académico ha sido eliminado. ${contacts_affected ? `${contacts_affected} contactos han sido afectados.` : ""}`;
        } catch (error) {
            if (error instanceof Error && error.message) throw new DegreeSpecificationError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar la especificación del grado académico.");
        }
    }
    async findByDegreeId(access: IAccessPermission, degree_id: string): Promise<IDegreeSpecificationResponse[]> {
        try {
            const degree_specifications = access.super_admin === true ?
                await DegreeSpecificationModel.findAll({
                    where: { degree_id: degree_id },
                })
                .then(degree_specifications => degree_specifications)
                .catch((_error) => { throw new DegreeSpecificationError("Ha ocurrido un error al tratar de obtener las especificaciones del grado académico.") }) :
                await DegreeSpecificationModel.findAll({
                    where: [
                        { degree_id: degree_id, user_id: access.user_id },
                        ListCondition(access), //excludes hidden and deleted if it doesn't have permission
                    ]
                })
                .then(degree_specifications => degree_specifications)
                .catch((_error) => { throw new DegreeSpecificationError("Ha ocurrido un error al tratar de obtener las especificaciones del grado académico.") });

            return degree_specifications.map(degree_specification => DegreespecificationPresenter(degree_specification.dataValues, access));
        } catch (error) {
            if (error instanceof Error && error.message) throw new DegreeSpecificationError(error.message);
            else throw new Error("Ha ocurrido un error al obtener las especificaciones del grado académico.");
        }
    }
}
const degreeSpecificationDao = new DegreespecificationDao();
export default degreeSpecificationDao;