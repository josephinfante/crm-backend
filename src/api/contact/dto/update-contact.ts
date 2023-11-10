import { Op } from "sequelize";
import { ContactError } from "../../../shared/errors";
import { Contact } from "../../../shared/schemas/contact.schema";
import { UpdateContactInterface } from "../contact.type";

export async function UpdateContact(id: string, data: UpdateContactInterface) {
    try {
        const contact = await Contact.findOne({ where: { id : id } }).catch(_error => { throw new ContactError('Ha ocurrido un error al revisar el contacto.') }).then(contact => contact);
        if (!contact) throw new ContactError(`El contacto con ID ${id} no existe.`);
        const record_exists = await checkRecordExistence(id, data);
        if (record_exists.length > 0) throw new Error('Ya existe un contacto con los datos proporcionados.');
        contact.set({
            first_name: data.first_name ?? contact.dataValues.first_name,
            last_name_1: data.last_name_1 ?? contact.dataValues.last_name_1,
            last_name_2: data.last_name_2 ?? contact.dataValues.last_name_2,
            email: data.email ?? contact.dataValues.email,
            document_type: data.document_type ?? contact.dataValues.document_type,
            document_number: data.document_number ?? contact.dataValues.document_number,
            phone_number: data.phone_number ?? contact.dataValues.phone_number,
            facebook_id: data.facebook_id ?? contact.dataValues.facebook_id,
            instagram_id: data.instagram_id ?? contact.dataValues.instagram_id,
            updatedAt: new Date(),
        });
        await contact.save().catch(_error => { throw new ContactError('Ha ocurrido un error al tratar de actualizar el contacto.') });
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactError(error.message);
        else throw new Error('Ha ocurrido un error al actualizar el contacto.');
    }
}

async function checkRecordExistence(id: string, data: UpdateContactInterface) {
    if ((!data.document_type || !data.document_number) && !data.email && !data.facebook_id && !data.instagram_id && !data.phone_number) return [];
    const whereCondition: {
        [key: string]: any;
    } = { id: { [Op.ne]: id } };
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