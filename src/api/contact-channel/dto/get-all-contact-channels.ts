import { ContactChannelError } from "../../../shared/errors";
import { ContactChannel } from "../../../shared/schemas";

export async function GetAllContactChannels() {
    try {
        const contact_channels = await ContactChannel.findAll().catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al revisar los canales de contacto.")}).then(contact_channels => contact_channels);
        return contact_channels.map(contact_channel => ({
                id: contact_channel.dataValues.id,
                name: contact_channel.dataValues.name,
                code: contact_channel.dataValues.code,
                is_automatic: contact_channel.dataValues.is_automatic,
                is_manual: contact_channel.dataValues.is_manual,
                createdAt: contact_channel.dataValues.createdAt,
                updatedAt: contact_channel.dataValues.updatedAt
        }));
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactChannelError(error.message);
        else throw new Error("Ha ocurrido un error al obtener los canales de contacto.");
    }
}