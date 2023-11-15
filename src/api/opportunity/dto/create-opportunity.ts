import { CareerError, ContactError, OpportunityError, SemesterError } from "../../../shared/errors";
import { Career, Contact, Opportunity, Semester, User } from "../../../shared/schemas";
import { UniqueID } from "../../../shared/utils";
import { CreateOpportunityInterface } from "../opportunity.type";

export async function CreateOpportunity(user_id: string, data: CreateOpportunityInterface) {
    try {
        const opportunity = await Opportunity.findAll({
            where: {
                contact_id: data.contact_id,
                career_id: data.career_id,
                semester_id: data.semester_id,
            }
        }).catch((_error) => {throw new OpportunityError("Ha ocurrido un error al revisar la oportunidad.")}).then(opportunity => opportunity);
        if (opportunity.length > 0) throw new OpportunityError("Ya existe una oportunidad con los datos proporcionados.");
        const contact = await Contact.findOne({ where: { id: data.contact_id } }).catch((_error) => {throw new ContactError("Ha ocurrido un error al revisar el contacto.")}).then(contact => contact);
        if (!contact) throw new Error(`El contacto con ID ${data.contact_id} no existe.`);
        const career = await Career.findOne({ where: { id: data.career_id } }).catch((_error) => {throw new CareerError("Ha ocurrido un error al revisar la carrera.")}).then(career => career);
        if (!career) throw new Error(`La carrera con ID ${data.career_id} no existe.`);
        const semester = await Semester.findOne({ where: { id: data.semester_id } }).catch((_error) => {throw new SemesterError("Ha ocurrido un error al revisar el semestre.")}).then(semester => semester);
        if (!semester) throw new Error(`El semestre con ID ${data.semester_id} no existe.`);
        const user = await User.findOne({ where: { id: user_id } }).catch((_error) => {throw new Error("Ha ocurrido un error al revisar el usuario.")}).then(user => user);
        if (!user) throw new Error(`El usuario con ID ${user_id} no existe.`);
        await Opportunity.create({
            id: UniqueID.generate(),
            contact_id: data.contact_id,
            career_id: data.career_id,
            semester_id: data.semester_id,
            user_id: user_id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).catch(_error => { throw new OpportunityError("Ha ocurrido un error al tratar de crear la oportunidad.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new OpportunityError(error.message);
        else throw new Error("Ha ocurrido un error al crear la oportunidad.");
    }
}