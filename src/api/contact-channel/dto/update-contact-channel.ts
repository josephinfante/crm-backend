import { Op } from "sequelize";
import { ContactChannel } from "../../../shared/schemas";
import { UpdateContactChannelInterface } from "../contact-channel.type";
import { ContactChannelError } from "../../../shared/errors";

export async function UpdateContactChannel(id: string, data: UpdateContactChannelInterface) {
    try {
        const contact_channel = await ContactChannel.findOne({ where : { id: id }}).catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al revisar el canal de contacto.")}).then(contact_channel => contact_channel);
        if (!contact_channel) throw new ContactChannelError(`El canal de contacto con ID ${id} no existe.`);
        const contact_channel_exists = await ContactChannel.findAll({
            where: {
                id: {
                    [Op.ne]: id
                },
                [Op.or]: [
                    { name: data.name },
                    { code: data.code }
                ]
            }
        }).catch((_error) => {throw new ContactChannelError("Ha ocurrido un error al revisar el canal de contacto.")}).then(contact_channel => contact_channel);
        if (contact_channel_exists.length > 0) throw new ContactChannelError("Ya existe un canal de contacto con los datos proporcionados.");
        contact_channel.set({
            name: data.name ?? contact_channel.dataValues.name,
            code: data.code ?? contact_channel.dataValues.code,
            is_automatic: data.is_automatic ?? contact_channel.dataValues.is_automatic,
            is_manual: data.is_manual ?? contact_channel.dataValues.is_manual,
            updatedAt: new Date()
        })
        await contact_channel.save().catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al tratar de actualizar el canal de contacto.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactChannelError(error.message);
        else throw new Error("Ha ocurrido un error al actualizar el canal de contacto.");
    }
}