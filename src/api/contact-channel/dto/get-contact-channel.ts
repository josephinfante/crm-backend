import { ContactChannelError } from "../../../shared/errors";
import { ContactChannel } from "../../../shared/schemas";

export async function GetContactChannel(id: string) {
    try {
        const contact_channel = await ContactChannel.findOne({ where : { id: id }}).catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al revisar el canal de contacto.")}).then(contact_channel => contact_channel);
        if (!contact_channel) throw new ContactChannelError(`El canal de contacto con ID ${id} no existe.`);
        return {
            id: contact_channel.dataValues.id,
            name: contact_channel.dataValues.name,
            code: contact_channel.dataValues.code,
            is_automatic: contact_channel.dataValues.is_automatic,
            is_manual: contact_channel.dataValues.is_manual,
            createdAt: contact_channel.dataValues.createdAt,
            updatedAt: contact_channel.dataValues.updatedAt,
        }
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactChannelError(error.message);
        else throw new Error("Ha ocurrido un error al obtener el canal de contacto.");
    }
}