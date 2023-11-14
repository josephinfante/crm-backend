import { Op } from "sequelize";
import { ContactError } from "../../../shared/errors";
import { Contact } from "../../../shared/schemas";

export async function GetContactsByName(first_name: string, page: number) {
    try {
        const { count, rows} = await Contact.findAndCountAll({
            where: {
                first_name: {[Op.like]: [`%${first_name}%`]}
            },
            limit: 100,
            offset: (page - 1) * 100
        }).catch(_error => {throw new ContactError("Ha ocurrido un error al revisar los contactos.")}).then(contacts => contacts);
        const reshapedContacts = rows.map((contact: any) => ({
            id: contact.dataValues.id,
            first_name: contact.dataValues.first_name,
            last_name_1: contact.dataValues.last_name_1,
            last_name_2: contact.dataValues.last_name_2,
            email: contact.dataValues.email,
            document_type: contact.dataValues.document_type,
            document_number: contact.dataValues.document_number,
            phone_number: contact.dataValues.phone_number,
            facebook_id: contact.dataValues.facebook_id,
            instagram_id: contact.dataValues.instagram_id,
            createdAt: contact.dataValues.createdAt,
            updatedAt: contact.dataValues.updatedAt,
        }));
        return { contacts: reshapedContacts, total_contacts: count, total_pages: Math.ceil(count / 100), current_page: page };
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactError(error.message);
        else throw new Error("Ha ocurrido un error al obtener los contactos.");
    }
}