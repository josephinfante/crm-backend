import { Op } from "sequelize";
import { ContactError } from "../../../shared/errors";
import { Contact } from "../../../shared/schemas";

export async function GetContactsByName(first_name: string) {
    try {
        const contacts_matching = await Contact.findAll({
            where: {
                first_name: {[Op.like]: [`%${first_name}%`]}
            }
        }).catch(_error => { throw new ContactError("Ha ocurrido un error al revisar los contactos.")}).then(contacts => contacts);
        return contacts_matching;
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactError(error.message);
        else throw new Error("Ha ocurrido un error al obtener los contactos.");
    }
}