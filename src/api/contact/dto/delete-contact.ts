import { ContactError, OpportunityError } from "../../../shared/errors";
import { Opportunity } from "../../../shared/schemas";
import { Contact } from "../../../shared/schemas/contact.schema";

export async function DeleteContact(id: string) {
    try {
        const contact = await Contact.findOne({ where: { id } }).catch(_error => { throw new ContactError("Ha ocurrido un error al revisar el contacto.")}).then(contact => contact);
        if (!contact) throw new ContactError(`El contacto con ID ${id} no existe.`);
        const opportunity_associated = await Opportunity.findAll({ where: { contact_id: id } }).catch(_error => { throw new OpportunityError("Ha ocurrido un error al revisar las oportunidades.")}).then(opportunity => opportunity);
        if (opportunity_associated.length > 0) throw new OpportunityError(`El contacto con ID ${id} no puede ser eliminado porque tiene ${opportunity_associated.length} oportunidades asociadas.`);
        await contact.destroy().catch(_error => { throw new ContactError("Ha ocurrido un error al tratar de eliminar el contacto.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactError(error.message);
        else throw new Error("Ha ocurrido un error al eliminar el contacto.");
    }
}