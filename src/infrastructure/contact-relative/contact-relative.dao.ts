import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { ContactRelative } from "../../domain/contact-relative/contact-relative";
import { ContactRelativeError, ContactError } from "../../shared/errors";
import { ContactRelativeModel, ContactModel } from "../../shared/models";
import { UniqueID } from "../../shared/utils";
import { ContactRelativePresenter, IContactRelativeResponse } from "../../interfaces/presenters/contact-relative.presenter";

class ContactRelativeDao {
    async create(access: IAccessPermission, contact_relative: ContactRelative): Promise<IContactRelativeResponse> {
        try {
            const contact_exist = await ContactModel.findByPk(contact_relative.contact_id)
                    .then(contact => contact)
                    .catch((_error) => { throw new ContactError("Ha ocurrido un error al revisar el canal de contacto.") });
            if (!contact_exist) throw new ContactError('El canal de contacto no existe.');

            const relative_exist = await ContactModel.findByPk(contact_relative.relative_id)
                    .then(relative => relative)
                    .catch((_error) => { throw new ContactError("Ha ocurrido un error al revisar el canal de contacto.") });
            if (!relative_exist) throw new ContactError('El canal de contacto no existe.');

            const new_contact_relative = {
                id: UniqueID.generate(),
                relationship: contact_relative.relationship,
                deleted: false,
                updatedAt: Date.now(),
                createdAt: Date.now(),
                contact_id: contact_relative.contact_id,
                relative_id: contact_relative.relative_id,
                user_id: access.user_id,
            }
            const [_contact_relative, created] = await ContactRelativeModel.findOrCreate({
                    where: [
                        ...(new_contact_relative.relationship !== 'Apoderado'? [{relationship: new_contact_relative.relationship}]: []),
                        { contact_id: new_contact_relative.contact_id },
                    ],
                    defaults: new_contact_relative,
                })
                .then(contact_relative => contact_relative)
                .catch(_error => { throw new ContactRelativeError("Ha ocurrido un error al tratar de crear el detalle del canal de contacto.")});

            if (!created) throw new ContactRelativeError("Ya existe un detalle del canal de contacto con los datos proporcionados.");

            return ContactRelativePresenter(new_contact_relative, access, contact_exist.dataValues, relative_exist.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactRelativeError(error.message);
            else throw new Error("Ha ocurrido un error al crear el detalle del canal de contacto.");
        }
    }
    async update(access: IAccessPermission, id: string, contact_relative: ContactRelative): Promise<IContactRelativeResponse> {
        try {
            let contact;
            let relative;
            const contact_relative_exist = await ContactRelativeModel.findOne({ 
                where: [ 
                    { id: id },
                    ...(access.super_admin === false ? [{user_id: access.user_id}] :[])
                ],
                include:[{ model: ContactModel }]
            })
            .then(contact_relative => contact_relative)
            .catch((_error) => { throw new ContactRelativeError("Ha ocurrido un error al revisar el detalle del canal de contacto.") });
            

            if (!contact_relative_exist) throw new ContactRelativeError('El detalle del canal de contacto no existe.');

            const contact_relative_coincidence = (contact_relative.relationship !== contact_relative_exist.dataValues.relationship) ?
                await ContactRelativeModel.findOne({
                        where: [
                            {relationship: contact_relative.relationship},
                            {id: { [Op.ne]: id } }
                        ]
                    })
                    .then(contact_relative => contact_relative)
                    .catch((_error) => { throw new ContactRelativeError("Ha ocurrido un error al revisar el detalle del canal de contacto.") }) : null;
            
            if (contact_relative_coincidence) throw new ContactRelativeError("Ya existe un detalle del canal de contacto con los datos proporcionados.");

            contact = contact_relative.contact_id !== contact_relative_exist.dataValues.contact?.dataValues.id ? 
                await ContactModel.findByPk(contact_relative.contact_id)
                    .then(contact => contact)
                    .catch((_error) => { throw new ContactError("Ha ocurrido un error al revisar el canal de contacto.") }) :
                contact_relative_exist.dataValues.contact;
            if (!contact) throw new ContactError('El contacto proporsionado no existe.');

            relative = contact_relative.relative_id !== contact_relative_exist.dataValues.relative?.dataValues.id ? 
                await ContactModel.findByPk(contact_relative.relative_id)
                    .then(relative => relative)
                    .catch((_error) => { throw new ContactError("Ha ocurrido un error al revisar el canal de contacto.") }) :
                contact_relative_exist.dataValues.relative;
            if (!relative) throw new ContactError('El familiar o apoderado proporsionado no existe.');

            contact_relative_exist.set({
                relationship: contact_relative.relationship ?? contact_relative_exist.dataValues.relationship,
                contact_id: contact_relative.contact_id !== contact_relative_exist.dataValues.contact?.dataValues.id ? contact_relative.contact_id : contact_relative_exist.dataValues.contact?.dataValues.id,
                relative_id: contact_relative.relative_id !== contact_relative_exist.dataValues.contact?.dataValues.id ? contact_relative.relative_id : contact_relative_exist.dataValues.relative?.dataValues.id,
                updatedAt: Date.now(),
            });

            const updated = await contact_relative_exist.save()
                .then(contact_relative => contact_relative)
                .catch((_error) => { throw new ContactRelativeError("Ha ocurrido un error al tratar actualizar el detalle del canal de contacto.") });

            return ContactRelativePresenter(updated.dataValues, access, contact?.dataValues, relative?.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactRelativeError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar el detalle del canal de contacto.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const contact_relative_exist = await ContactRelativeModel
            .findOne({ where: [
                { id: id },
                ...(access.super_admin === false? [{user_id: access.user_id}]: [])
            ] })
            .then(contact_relative => contact_relative)
            .catch((_error) => { throw new ContactRelativeError("Ha ocurrido un error al revisar el detalle del canal de contacto.") });
            if (!contact_relative_exist) throw new ContactRelativeError('El detalle del canal de contacto no existe.');

            contact_relative_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });
            await contact_relative_exist.save().catch((_error) => { throw new ContactRelativeError("Ha ocurrido un error al tratar de eliminar el detalle del canal de contacto.") });
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactRelativeError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar el detalle del canal de contacto.");
        }
    }
    async findByContactId(access: IAccessPermission, contact_id: string): Promise<IContactRelativeResponse[]> {
        try {
            const contact_relatives = await ContactRelativeModel.findAll({ 
                where: [
                    ...(access.super_admin === false?[{ user_id: access.user_id }]:[]),
                    { contact_id: contact_id }
                ],
                include:[{ model: ContactModel, as: 'contact' },
                    { model: ContactModel, as: 'relative' }]
            })
            .then(contact_relatives => contact_relatives)
            .catch((_error) => { throw new ContactRelativeError("Ha ocurrido un error al revisar el detalle del canal de contacto.") });

            return contact_relatives.map(contact_relative => ContactRelativePresenter(contact_relative.dataValues, access, contact_relative.dataValues.contact?.dataValues, contact_relative.dataValues.relative?.dataValues));
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactRelativeError(error.message);
            else throw new Error("Ha ocurrido un error al buscar los detalles del canal de contacto.");
        }
    }
    async findById(access: IAccessPermission, id: string): Promise<IContactRelativeResponse> {
        try {
            const contact_relative = await ContactRelativeModel.findOne({ 
                where: [
                    ...(access.super_admin === false?[{ user_id: access.user_id }]:[]),
                    { id: id }
                ],
                include:[{ model: ContactModel, as: 'contact' },
                    { model: ContactModel, as: 'relative' }]
            })
            .then(contact_relative => contact_relative)
            .catch((_error) => { throw new ContactRelativeError("Ha ocurrido un error al revisar el detalle del canal de contacto.") });

            return ContactRelativePresenter(contact_relative?.dataValues, access, contact_relative?.dataValues.contact?.dataValues, contact_relative?.dataValues.relative?.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactRelativeError(error.message);
            else throw new Error("Ha ocurrido un error al buscar los detalles del canal de contacto.");
        }
    }
}
const contactRelativeDao = new ContactRelativeDao();
export default contactRelativeDao;