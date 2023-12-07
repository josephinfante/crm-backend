import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { ContactChannel } from "../../domain/contact-channel/contact-channel";
import { ListCondition, UniqueID } from "../../shared/utils";
import { ContactChannelError } from "../../shared/errors";
import { ContactChannelPresenter, IContactChannelResponse } from "../../interfaces/presenters/contact-channel.presenter";
import { ContactChannelModel } from "../../shared/models";

class ContactChannelDao {
    async create(access: IAccessPermission, contact_channel: ContactChannel): Promise<IContactChannelResponse> {
        try {
            const new_contact_channel = {
                id: UniqueID.generate(),
                name: contact_channel.name,
                code: contact_channel.code,
                automatic_assignment: contact_channel.automatic_assignment,
                manual_assignment: contact_channel.manual_assignment,
                send_email: contact_channel.send_email,
                send_sms: contact_channel.send_sms,
                send_note: contact_channel.send_note,
                expire_days: contact_channel.expire_days,
                hidden: false,
                deleted: false,
                updatedAt: Date.now(),
                createdAt: Date.now(),
                user_id: access.user_id,
            }
            const [_contact_channel, created] = await ContactChannelModel.findOrCreate({
                    where: {
                        [Op.or]: [
                            { name: new_contact_channel.name },
                            { code: new_contact_channel.code },
                        ]
                    },
                    defaults: new_contact_channel,
                })
                .then(contact_channel => contact_channel)
                .catch(_error => { throw new ContactChannelError("Ha ocurrido un error al tratar de crear el canal de contacto.")});

            if (!created) throw new ContactChannelError("Ya existe un canal de contacto con los datos proporcionados.");

            return ContactChannelPresenter(new_contact_channel, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactChannelError(error.message);
            else throw new Error("Ha ocurrido un error al crear el canal de contacto.");
        }
    }
    async update(access: IAccessPermission, id: string, contact_channel: ContactChannel): Promise<IContactChannelResponse> {
        try {
            const contact_channel_exist = access.super_admin === true ? 
                await ContactChannelModel.findOne({ where: { id: id } })
                    .then(contact_channel => contact_channel)
                    .catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al revisar el canal de contacto.") }) : 
                await ContactChannelModel.findOne({ where: { id: id, user_id: access.user_id} })
                    .then(contact_channel => contact_channel)
                    .catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al revisar el canal de contacto.") });
            
            if (!contact_channel_exist) throw new ContactChannelError('El canal de contacto no existe.');

            const contact_channel_coincidence = (contact_channel.name !== contact_channel_exist.dataValues.name || contact_channel.code !== contact_channel_exist.dataValues.code) ?
                await ContactChannelModel.findAll({
                        where: {
                            [Op.or]: [
                                { name: contact_channel.name },
                                { code: contact_channel.code },
                            ]
                        }
                    })
                    .then(contact_channels => contact_channels)
                    .catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al revisar el canal de contacto.") }) : [];

            if (contact_channel_coincidence.length > 0) throw new ContactChannelError("Ya existe un canal de contacto con los datos proporcionados.");

            contact_channel_exist.set({
                name: contact_channel.name ?? contact_channel_exist.dataValues.name,
                code: contact_channel.code ?? contact_channel_exist.dataValues.code,
                automatic_assignment: contact_channel.automatic_assignment ?? contact_channel_exist.dataValues.automatic_assignment,
                manual_assignment: contact_channel.manual_assignment ?? contact_channel_exist.dataValues.manual_assignment,
                send_email: contact_channel.send_email ?? contact_channel_exist.dataValues.send_email,
                send_sms: contact_channel.send_sms ?? contact_channel_exist.dataValues.send_sms,
                send_note: contact_channel.send_note ?? contact_channel_exist.dataValues.send_note,
                expire_days: contact_channel.expire_days ?? contact_channel_exist.dataValues.expire_days,
                hidden: contact_channel.hidden ?? contact_channel_exist.dataValues.hidden,
                updatedAt: Date.now(),
            });

            const updated = await contact_channel_exist.save()
                .then(contact_channel => contact_channel)
                .catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al actualizar el canal de contacto.") });

            return ContactChannelPresenter(updated.dataValues, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactChannelError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar el canal de contacto.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const contact_channel_exist = access.super_admin === true ? 
                await ContactChannelModel.findOne({ where: { id: id } })
                    .then(contact_channel => contact_channel)
                    .catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al revisar el canal de contacto.") }) : 
                await ContactChannelModel.findOne({ where: { id: id, user_id: access.user_id} })
                    .then(contact_channel => contact_channel)
                    .catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al revisar el canal de contacto.") });
            
            if (!contact_channel_exist) throw new ContactChannelError('El canal de contacto no existe.');

            contact_channel_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });

            contact_channel_exist.save().catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al tratar de eliminar el canal de contacto.") });
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactChannelError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar el canal de contacto.");
        }
    }
    async findAll(access: IAccessPermission): Promise<IContactChannelResponse[]> {
        try {
            const contact_channels = access.super_admin === true ? 
                await ContactChannelModel.findAll()
                    .then(contact_channels => contact_channels)
                    .catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al obtener los canales de contacto.") }) : 
                await ContactChannelModel.findAll({ 
                        where: [
                            { user_id: access.user_id },
                            ListCondition(access)
                        ]
                    })
                    .then(contact_channels => contact_channels)
                    .catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al obtener los canales de contacto.") });
            
            return contact_channels.map(contact_channel => ContactChannelPresenter(contact_channel.dataValues, access));
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactChannelError(error.message);
            else throw new Error("Ha ocurrido un error al obtener los canales de contacto.");
        }
    }
}
const contactChannelDao = new ContactChannelDao();
export default contactChannelDao;