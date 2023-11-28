import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { ContactDegreeError } from "../../shared/errors";
import { UniqueID } from "../../shared/utils";
import { CollegeModel, ContactDegreeModel, DegreeSpecificationModel } from "../../shared/models";
import { ICreateContactDegree } from "../../domain/contact-degree/contact-degree.type";

export async function CreateContactDegree(access: IAccessPermission, contact_degree: ICreateContactDegree) {
    try {
        const [_contact_degree, created] = await ContactDegreeModel.findOrCreate({
                where: {
                    [Op.and]: [
                        { degree_especification_id: contact_degree.degree_specification_id },
                        { contact_id: contact_degree.contact_id },
                        { college_id: contact_degree.college_id },
                        { user_id: access.user_id }
                    ]
                    
                },
                defaults: {
                    id: UniqueID.generate(),
                    graduation_date: contact_degree.graduation_date,
                    hidden: false,
                    deleted: false,
                    updatedAt: Date.now(),
                    createdAt: Date.now(),
                    degree_especification_id: contact_degree.degree_specification_id,
                    contact_id: contact_degree.contact_id,
                    college_id: contact_degree.college_id,
                    user_id: access.user_id,
                }
            })
            .then(contact_degree => contact_degree)
            .catch((_error) => { throw new ContactDegreeError("Ha ocurrido un error al tratar de crear el grado académico del contacto.") })
        if (!created) throw new ContactDegreeError(`El grado académico del contacto con los datos proporcionados ya existe.`);
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactDegreeError(error.message);
        else throw new Error("Ha ocurrido un error al crear el grado académico del contacto.");
    }
}

export async function UpdateContactDegree(access: IAccessPermission, contact_degree: ICreateContactDegree) {
    try {
        const contact_degree_exist = access.super_admin === true ?
            await ContactDegreeModel.findOne({
                    where: {degree_especification_id: contact_degree.degree_specification_id, contact_id: contact_degree.contact_id, college_id: contact_degree.college_id}
                })
                .then(contact_degree => contact_degree)
                .catch((_error) => { throw new ContactDegreeError("Ha ocurrido un error al revisar el grado académico del contacto.") }) :
            await ContactDegreeModel.findOne({
                    where: {degree_especification_id: contact_degree.degree_specification_id, contact_id: contact_degree.contact_id, college_id: contact_degree.college_id, user_id: access.user_id}
                })
                .then(contact_degree => contact_degree)
                .catch((_error) => { throw new ContactDegreeError("Ha ocurrido un error al revisar el grado académico del contacto.") });

        if (contact_degree_exist) {
            const contact_degree_coincidence = (contact_degree.college_id !== contact_degree_exist.dataValues.college_id || contact_degree.contact_id !== contact_degree_exist.dataValues.contact_id || contact_degree.degree_specification_id !== contact_degree_exist.dataValues.degree_specification_id || contact_degree.graduation_date !== contact_degree_exist.dataValues.graduation_date) ? await ContactDegreeModel.findAll({
                        where: {
                            [Op.and]: [
                                { college_id: contact_degree.college_id },
                                { contact_id: contact_degree.contact_id },
                                { degree_specification_id: contact_degree.degree_specification_id },
                            ]
                        }
                    })
                    .then(contact_degrees => contact_degrees)
                    .catch((_error) => { throw new ContactDegreeError("Ha ocurrido un error al revisar los grados académicos del contacto.") }) : [];
        
            if (contact_degree_coincidence.length > 0) throw new ContactDegreeError('El grado académico del contacto con los datos proporcionados ya existe.');

            await contact_degree_exist.destroy()
                .catch((_error) => { throw new ContactDegreeError("Ha ocurrido un error al tratar de eliminar el grado académico del contacto.") });
            await CreateContactDegree(access, contact_degree_exist.dataValues);
        }
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactDegreeError(error.message);
        else throw new Error("Ha ocurrido un error al actualizar el grado académico del contacto.");
    }
}

export async function FindContactDegreeByFields(access: IAccessPermission, contact_degree: ICreateContactDegree) {
    try {
        const contact_degree_exist = access.super_admin === true ?
            await ContactDegreeModel.findOne({
                    where: {degree_especification_id: contact_degree.degree_specification_id, contact_id: contact_degree.contact_id, college_id: contact_degree.college_id},
                    include: [
                        {model: DegreeSpecificationModel},
                        {model: CollegeModel}
                    ]
                })
                .then(contact_degree => contact_degree)
                .catch((_error) => { throw new ContactDegreeError("Ha ocurrido un error al revisar el grado académico del contacto.") }) :
            await ContactDegreeModel.findOne({
                    where: {degree_especification_id: contact_degree.degree_specification_id, contact_id: contact_degree.contact_id, college_id: contact_degree.college_id, user_id: access.user_id},
                    include: [
                        {model: DegreeSpecificationModel},
                        {model: CollegeModel}
                    ]
                })
                .then(contact_degree => contact_degree)
                .catch((_error) => { throw new ContactDegreeError("Ha ocurrido un error al revisar el grado académico del contacto.") });

        if (contact_degree_exist) {
            return ({
                degree_specification: {
                    id: contact_degree_exist.dataValues.degree_specification.dataValues.id,
                    name: contact_degree_exist.dataValues.degree_specification.dataValues.name,
                    updatedAt: contact_degree_exist.dataValues.degree_specification.dataValues.updatedAt,
                    createdAt: contact_degree_exist.dataValues.degree_specification.dataValues.createdAt,
                    degree_id: contact_degree_exist.dataValues.degree_specification.dataValues.degree_id,
                },
                college: {
                    id: contact_degree_exist.dataValues.college.dataValues.id,
                    name: contact_degree_exist.dataValues.college.dataValues.name,
                    code: contact_degree_exist.dataValues.college.dataValues.code,
                    type: contact_degree_exist.dataValues.college.dataValues.type,
                    class: contact_degree_exist.dataValues.college.dataValues.class,
                    level: contact_degree_exist.dataValues.college.dataValues.level,
                    board: contact_degree_exist.dataValues.college.dataValues.board,
                    is_competitor: contact_degree_exist.dataValues.college.dataValues.is_competitor,
                    priority: contact_degree_exist.dataValues.college.dataValues.priority,
                    updatedAt: contact_degree_exist.dataValues.college.dataValues.updatedAt,
                    createdAt: contact_degree_exist.dataValues.college.dataValues.createdAt,
                },
                graduation_date: contact_degree_exist.dataValues.graduation_date,
            })
        }
        return null;
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactDegreeError(error.message);
        else throw new Error("Ha ocurrido un error al buscar el grado académico del contacto.");
    }
}