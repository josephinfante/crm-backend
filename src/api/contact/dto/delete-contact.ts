import { ContactError } from "../../../shared/errors";
import { Contact } from "../../../shared/schemas/contact.schema";

export async function DeleteContact(id: string) {
    try {
        const contact = await Contact.findOne({ where: { id } }).catch(_error => { throw new ContactError("Ha ocurrido un error al revisar el contacto.")}).then(contact => contact);
        if (!contact) throw new ContactError(`El contacto con ID ${id} no existe.`);
        await contact.destroy().catch(_error => { throw new ContactError("Ha ocurrido un error al tratar de eliminar el contacto.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactError(error.message);
        else throw new Error("Ha ocurrido un error al eliminar el contacto.");
    }
}