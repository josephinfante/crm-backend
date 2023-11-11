import { CareerError, ContactError, OpportunityError, SemesterError } from "../../../shared/errors";
import { Career, Contact, Opportunity, Semester } from "../../../shared/schemas";
import { UpdateOpportunityInterface } from "../opportunity.type"

export async function UpdateOpportunity(id: string, data: UpdateOpportunityInterface) {
    try {
        const opportunity = await Opportunity.findOne({ where: { id } }).catch((_error) => {throw new OpportunityError("Ha ocurrido un error al revisar la oportunidad.")}).then(opportunity => opportunity);
        if (!opportunity) throw new OpportunityError(`La oportunidad con ID ${id} no existe.`);
        const opportunity_exists = await Opportunity.findAll({
            where: {
                contact_id: data.contact_id,
                career_id: data.career_id,
                semester_id: data.semester_id,
            }
        }).catch((_error) => {throw new OpportunityError("Ha ocurrido un error al revisar la oportunidad.")}).then(opportunity => opportunity);
        if (opportunity_exists.length > 0) throw new OpportunityError("Ya existe una oportunidad con los datos proporcionados.");
        const contact = data.contact_id && await Contact.findOne({ where: { id: data.contact_id } }).catch((_error) => {throw new ContactError("Ha ocurrido un error al revisar el contacto.")}).then(contact => contact);
        if (data.contact_id && !contact) throw new ContactError(`El contacto con ID ${data.contact_id} no existe.`);
        const career = data.career_id && await Career.findOne({ where: { id: data.career_id } }).catch((_error) => {throw new CareerError("Ha ocurrido un error al revisar la carrera.")}).then(career => career);
        if (data.career_id && !career) throw new CareerError(`La carrera con ID ${data.career_id} no existe.`);
        const semester = data.semester_id && await Semester.findOne({ where: { id: data.semester_id } }).catch((_error) => {throw new SemesterError("Ha ocurrido un error al revisar el semestre.")}).then(semester => semester);
        if (data.semester_id && !semester) throw new SemesterError(`El semestre con ID ${data.semester_id} no existe.`);
        opportunity.set({
            contact_id: data.contact_id && contact ? data.contact_id : opportunity.dataValues.contact_id,
            career_id: data.career_id && career ? data.career_id : opportunity.dataValues.career_id,
            semester_id: data.semester_id && semester ? data.semester_id : opportunity.dataValues.semester_id,
            updatedAt: new Date(),
        });
        await opportunity.save().catch((_error) => {throw new OpportunityError("Ha ocurrido un error al actualizar la oportunidad.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new OpportunityError(error.message);
        else throw new Error("Ha ocurrido un error al actualizar la oportunidad.");
    }
}