import { ContactError } from "../../../shared/errors";
import { Contact } from "../../../shared/schemas/contact.schema";

export async function GetContact(id: string) {
    try {
        const contact = await Contact.findOne({ where: { id } }).catch(_error => { throw new ContactError("Ha ocurrido un error al revisar el contacto.")}).then(contact => contact);
        if (!contact) throw new ContactError(`El contacto con ID ${id} no existe.`);
        return contact;
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactError(error.message);
        else throw new Error("Ha ocurrido un error al obtener el contacto.");
    }
}