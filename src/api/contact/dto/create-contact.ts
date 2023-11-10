import { Op } from "sequelize";
import { Contact } from "../../../shared/schemas/contact.schema";
import { CreateContactInterface } from "../contact.type";
import { ContactError } from "../../../shared/errors";
import { UniqueID } from "../../../shared/utils";

export async function CreateContact(data: CreateContactInterface) {
    try {
        const contact = await checkRecordExistence(data);
        if (contact.length > 0) throw new Error("Ya existe un contacto con los datos proporcionados.");
        await Contact.create({
            id: UniqueID.generate(),
            first_name: data.first_name,
            last_name_1: data.last_name_1,
            last_name_2: data.last_name_2,
            email: data.email,
            document_type: data.document_type,
            document_number: data.document_number,
            phone_number: data.phone_number,
            facebook_id: data.facebook_id,
            instagram_id: data.instagram_id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).catch(_error => { throw new ContactError("Ha ocurrido un error al tratar de crear el contacto.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactError(error.message);
        else throw new Error("Ha ocurrido un error al crear el contacto.");
    }
}

async function checkRecordExistence(data: CreateContactInterface) {
    if ((!data.document_type || !data.document_number) && !data.email && !data.facebook_id && !data.instagram_id && !data.phone_number) return [];
    const whereCondition: {
        [key: string]: any;
    } = {};
    if (data.document_type || data.document_number) {
        (whereCondition as any)[Op.or] = (whereCondition as any)[Op.or] || [];
        (whereCondition as any)[Op.or].push({ document_type: data.document_type, document_number: data.document_number });
    }
    if (data.email) {
        (whereCondition as any)[Op.or] = (whereCondition as any)[Op.or] || [];
        (whereCondition as any)[Op.or].push({ email: data.email });
    }
    if (data.facebook_id) {
        (whereCondition as any)[Op.or] = (whereCondition as any)[Op.or] || [];
        (whereCondition as any)[Op.or].push({ facebook_id: data.facebook_id });
    }
    if (data.instagram_id) {
        (whereCondition as any)[Op.or] = (whereCondition as any)[Op.or] || [];
        (whereCondition as any)[Op.or].push({ instagram_id: data.instagram_id });
    }
    if (data.phone_number) {
        (whereCondition as any)[Op.or] = (whereCondition as any)[Op.or] || [];
        (whereCondition as any)[Op.or].push({ phone_number: data.phone_number });
    }
    const record_exists = await Contact.findAll({
            where: whereCondition
        }).catch((_error: any) => {throw new ContactError("Ha ocurrido un error al revisar el contacto.")}).then((records: any) => records);
    return record_exists;
}