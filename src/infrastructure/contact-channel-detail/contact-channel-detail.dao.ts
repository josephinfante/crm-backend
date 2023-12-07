import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { ContactchannelDetail } from "../../domain/contact-channel-detail/contact-channel-detail";
import { ContactChannelDetailError, ContactChannelError } from "../../shared/errors";
import { ContactChannelDetailModel, ContactChannelModel } from "../../shared/models";
import { UniqueID } from "../../shared/utils";
import { ContactChannelDetailPresenter, IContactChannelDetailResponse } from "../../interfaces/presenters/contact-channel-detail.presenter";

class ContactChannelDetailDao {
    async create(access: IAccessPermission, contact_channel_detail: ContactchannelDetail): Promise<IContactChannelDetailResponse> {
        try {
            const contact_channel_exist = await ContactChannelModel.findByPk(contact_channel_detail.contact_channel_id)
                    .then(contact_channel => contact_channel)
                    .catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al revisar el canal de contacto.") });
            
            if (!contact_channel_exist) throw new ContactChannelError('El canal de contacto no existe.');

            const new_contact_channel_detail = {
                id: UniqueID.generate(),
                name: contact_channel_detail.name,
                hidden: false,
                deleted: false,
                updatedAt: Date.now(),
                createdAt: Date.now(),
                contact_channel_id: contact_channel_detail.contact_channel_id,
                user_id: access.user_id,
            }
            const [_contact_channel_detail, created] = await ContactChannelDetailModel.findOrCreate({
                    where: {
                        name: new_contact_channel_detail.name,
                        contact_channel_id: new_contact_channel_detail.contact_channel_id,
                    },
                    defaults: new_contact_channel_detail,
                })
                .then(contact_channel_detail => contact_channel_detail)
                .catch(_error => { throw new ContactChannelDetailError("Ha ocurrido un error al tratar de crear el detalle del canal de contacto.")});

            if (!created) throw new ContactChannelDetailError("Ya existe un detalle del canal de contacto con los datos proporcionados.");

            return ContactChannelDetailPresenter(new_contact_channel_detail, access, contact_channel_exist.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactChannelDetailError(error.message);
            else throw new Error("Ha ocurrido un error al crear el detalle del canal de contacto.");
        }
    }
    async update(access: IAccessPermission, id: string, contact_channel_detail: ContactchannelDetail): Promise<IContactChannelDetailResponse> {
        try {
            let contact_channel;
            const contact_channel_detail_exist = access.super_admin === true ?
                await ContactChannelDetailModel.findOne({ 
                        where: { id: id },
                        include:[{ model: ContactChannelModel }]
                    })
                    .then(contact_channel_detail => contact_channel_detail)
                    .catch((_error) => { throw new ContactChannelDetailError("Ha ocurrido un error al revisar el detalle del canal de contacto.") }) :
                await ContactChannelDetailModel.findOne({ 
                        where: { id: id, user_id: access.user_id},
                        include:[{ model: ContactChannelModel }]
                    })
                    .then(contact_channel_detail => contact_channel_detail)
                    .catch((_error) => { throw new ContactChannelDetailError("Ha ocurrido un error al revisar el detalle del canal de contacto.") });

            if (!contact_channel_detail_exist) throw new ContactChannelDetailError('El detalle del canal de contacto no existe.');

            const contact_channel_detail_coincidence = (contact_channel_detail.name !== contact_channel_detail_exist.dataValues.name) ?
                await ContactChannelDetailModel.findOne({
                        where: [
                            {name: contact_channel_detail.name},
                            {id: { [Op.ne]: id } }
                        ]
                    })
                    .then(contact_channel_detail => contact_channel_detail)
                    .catch((_error) => { throw new ContactChannelDetailError("Ha ocurrido un error al revisar el detalle del canal de contacto.") }) : null;
            
            if (contact_channel_detail_coincidence) throw new ContactChannelDetailError("Ya existe un detalle del canal de contacto con los datos proporcionados.");

            contact_channel = contact_channel_detail.contact_channel_id !== contact_channel_detail_exist.dataValues.contact_channel?.dataValues.id ? 
                await ContactChannelModel.findByPk(contact_channel_detail.contact_channel_id)
                    .then(contact_channel => contact_channel)
                    .catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al revisar el canal de contacto.") }) :
                contact_channel_detail_exist.dataValues.contact_channel;
            
            if (!contact_channel) throw new ContactChannelError('El canal de contacto proporsionado no existe.');

            contact_channel_detail_exist.set({
                name: contact_channel_detail.name ?? contact_channel_detail_exist.dataValues.name,
                contact_channel_id: contact_channel_detail.contact_channel_id !== contact_channel_detail_exist.dataValues.contact_channel?.dataValues.id ? contact_channel_detail.contact_channel_id : contact_channel_detail_exist.dataValues.contact_channel?.dataValues.id,
                hidden: contact_channel_detail.hidden ?? contact_channel_detail_exist.dataValues.hidden,
                updatedAt: Date.now(),
            });

            const updated = await contact_channel_detail_exist.save()
                .then(contact_channel_detail => contact_channel_detail)
                .catch((_error) => { throw new ContactChannelDetailError("Ha ocurrido un error al tratar actualizar el detalle del canal de contacto.") });

            return ContactChannelDetailPresenter(updated.dataValues, access, contact_channel?.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactChannelDetailError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar el detalle del canal de contacto.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const contact_channel_detail_exist = access.super_admin === true ?
                await ContactChannelDetailModel.findOne({ where: { id: id } })
                    .then(contact_channel_detail => contact_channel_detail)
                    .catch((_error) => { throw new ContactChannelDetailError("Ha ocurrido un error al revisar el detalle del canal de contacto.") }) :
                await ContactChannelDetailModel.findOne({ where: { id: id, user_id: access.user_id} })
                    .then(contact_channel_detail => contact_channel_detail)
                    .catch((_error) => { throw new ContactChannelDetailError("Ha ocurrido un error al revisar el detalle del canal de contacto.") });

            if (!contact_channel_detail_exist) throw new ContactChannelDetailError('El detalle del canal de contacto no existe.');

            contact_channel_detail_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });

            await contact_channel_detail_exist.save().catch((_error) => { throw new ContactChannelDetailError("Ha ocurrido un error al tratar de eliminar el detalle del canal de contacto.") });
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactChannelDetailError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar el detalle del canal de contacto.");
        }
    }
    async findByContactChannelId(access: IAccessPermission, contact_channel_id: string): Promise<IContactChannelDetailResponse[]> {
        try {
            const contact_channel_details = access.super_admin === true ?
                await ContactChannelDetailModel.findAll({ 
                        where: { contact_channel_id: contact_channel_id },
                        include:[{ model: ContactChannelModel }]
                    })
                    .then(contact_channel_details => contact_channel_details)
                    .catch((_error) => { throw new ContactChannelDetailError("Ha ocurrido un error al revisar el detalle del canal de contacto.") }) : 
                await ContactChannelDetailModel.findAll({ 
                        where: { contact_channel_id: contact_channel_id, user_id: access.user_id },
                        include:[{ model: ContactChannelModel }] 
                    })
                    .then(contact_channel_details => contact_channel_details)
                    .catch((_error) => { throw new ContactChannelDetailError("Ha ocurrido un error al revisar el detalle del canal de contacto.") });

            return contact_channel_details.map(contact_channel_detail => ContactChannelDetailPresenter(contact_channel_detail.dataValues, access, contact_channel_detail.dataValues.contact_channel?.dataValues));
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactChannelDetailError(error.message);
            else throw new Error("Ha ocurrido un error al buscar los detalles del canal de contacto.");
        }
    }
}
const contactChannelDetailDao = new ContactChannelDetailDao();
export default contactChannelDetailDao;