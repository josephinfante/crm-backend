import { Op } from "sequelize";
import { ContactChannel } from "../../../shared/schemas";
import { CreateContactChannelInterface } from "../contact-channel.type";
import { ContactChannelError } from "../../../shared/errors";
import { UniqueID } from "../../../shared/utils";

export async function CreateContactChannel(data: CreateContactChannelInterface) {
    try {
        const contact_channel = await ContactChannel.findAll({
            where: {
                [Op.or]: [
                    { name: data.name },
                    { code: data.code }
                ]
            }
        }).catch((_error) => {throw new ContactChannelError("Ha ocurrido un error al revisar el canal de contacto.")}).then(contact_channel => contact_channel);
        if (contact_channel.length > 0) throw new ContactChannelError("Ya existe un canal de contacto con los datos proporcionados.");
        await ContactChannel.create({
            id: UniqueID.generate(),
            name: data.name,
            code: data.code,
            is_automatic: data.is_automatic,
            is_manual: data.is_manual,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).catch(_error => { throw new ContactChannelError("Ha ocurrido un error al tratar de crear el canal de contacto.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactChannelError(error.message);
        else throw new Error("Ha ocurrido un error al crear el canal de contacto.");
    }
}