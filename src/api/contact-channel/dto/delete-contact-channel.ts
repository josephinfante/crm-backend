import { ContactChannelError } from "../../../shared/errors";
import { ContactChannel } from "../../../shared/schemas";

export async function DeleteContactChannel(id: string) {
    try {
        const contact_channel = await ContactChannel.findOne({ where : { id: id }}).catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al revisar el canal de contacto.")}).then(contact_channel => contact_channel);
        if (!contact_channel) throw new ContactChannelError(`El canal de contacto con ID ${id} no existe.`);
        await contact_channel.destroy().catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al tratar de eliminar el canal de contacto.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactChannelError(error.message);
        else throw new Error("Ha ocurrido un error al eliminar el canal de contacto.");
    }
}