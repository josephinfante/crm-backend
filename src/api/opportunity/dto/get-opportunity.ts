import { CareerError, ContactError, OpportunityError, SemesterError } from "../../../shared/errors";
import { Career, Contact, Opportunity, Semester } from "../../../shared/schemas";

export async function GetOpportunity(id: string) {
    try {
        const opportunity = await Opportunity.findOne({ where: { id } }).catch((_error) => {throw new OpportunityError("Ha ocurrido un error al revisar la oportunidad.")}).then(opportunity => opportunity);
        if (!opportunity) throw new OpportunityError(`La oportunidad con ID ${id} no existe.`);
        const contact = await Contact.findOne({ where: { id: opportunity.dataValues.contact_id } }).catch((_error) => {throw new ContactError("Ha ocurrido un error al revisar el contacto.")}).then(contact => contact);
        const career = await Career.findOne({ where: { id: opportunity.dataValues.career_id } }).catch((_error) => {throw new CareerError("Ha ocurrido un error al revisar la carrera.")}).then(career => career);
        const semester = await Semester.findOne({ where: { id: opportunity.dataValues.semester_id } }).catch((_error) => {throw new SemesterError("Ha ocurrido un error al revisar el semestre.")}).then(semester => semester);
        if (!contact) throw new ContactError(`El contacto con ID ${opportunity.dataValues.contact_id} no existe.`);
        if (!career) throw new CareerError(`La carrera con ID ${opportunity.dataValues.career_id} no existe.`);
        if (!semester) throw new SemesterError(`El semestre con ID ${opportunity.dataValues.semester_id} no existe.`);
        return {
            id: opportunity.dataValues.id,
            contact: contact.dataValues,
            career: career.dataValues,
            semester: semester.dataValues,
            createdAt: opportunity.dataValues.createdAt,
            updatedAt: opportunity.dataValues.updatedAt,
        };
    } catch (error) {
        if (error instanceof Error && error.message) throw new OpportunityError(error.message);
        else throw new Error("Ha ocurrido un error al obtener la oportunidad.");
    }
}