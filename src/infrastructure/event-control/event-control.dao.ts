import { IAccessPermission } from "../../domain/auth/access.type";
import { EventControl } from "../../domain/event-control/event-control";
import { EventControlPresenter, IEventControlResponse } from "../../interfaces/presenters/event-control.presenter";
import { ContactError, EventControlError, EventError } from "../../shared/errors";
import { ContactModel, EventControlModel, EventModel, OpportunityModel } from "../../shared/models";
import { ListCondition, UniqueID } from "../../shared/utils";

class EventControlDao {
    async create(access: IAccessPermission, event_control: EventControl): Promise<IEventControlResponse> {
        try {
            let event;
            let contact;
            let opportunity;
            if (event_control.event_id) {
                event = await EventModel.findOne({
                        where: [
                            { id: event_control.event_id },
                            ...(access.super_admin === false ? [{ user_id: access.user_id }] : [])
                        ]
                    })
                    .then(event => event)
                    .catch(_error => { throw new EventError("Ha ocurrido un error al revisar el evento.") });
                    
                if (!event) throw new EventError("El evento proporcionado no existe.");
            }
            if (event_control.contact_id) {
                contact = await ContactModel.findOne({
                        where: [
                            { id: event_control.contact_id },
                            ...(access.super_admin === false ? [{ user_id: access.user_id }] : [])
                        ]
                    })
                    .then(contact => contact)
                    .catch(_error => { throw new ContactError("Ha ocurrido un error al revisar el contacto.") });

                if (!contact) throw new ContactError("El contacto proporcionado no existe.");
            }
            if (event_control.opportunity_id) {
                opportunity = await OpportunityModel.findOne({
                        where: [
                            { id: event_control.opportunity_id },
                            ...(access.super_admin === false ? [{ user_id: access.user_id }] : [])
                        ]
                    })
                    .then(opportunity => opportunity)
                    .catch(_error => { throw new EventError("Ha ocurrido un error al revisar la oportunidad.") });

                if (!opportunity) throw new EventError("La oportunidad proporcionada no existe.");
            }
            const new_event_control = {
                id: UniqueID.generate(),
                confirmed: event_control.confirmed,
                attended: event_control.attended,
                will_apply: event_control.will_apply,
                qr_url: event_control.qr_url,
                event_url: event_control.event_url,
                post_event_url: event_control.post_event_url,
                sent_sms: event_control.sent_sms,
                sent_email: event_control.sent_email,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                event_id: event_control.event_id,
                contact_id: event_control.contact_id,
                opportunity_id: event_control.opportunity_id,
                user_id: access.user_id
            }

            await EventControlModel.create(new_event_control).catch(_error => { throw new EventControlError("Ha ocurrido un error al tratar de crear el control de evento.") });
            return EventControlPresenter(new_event_control, access, event?.dataValues, contact?.dataValues, opportunity?.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new EventControlError(error.message);
            else throw new Error("Ha ocurrido un error al crear el control de evento.");
        }
    }
    async update(access: IAccessPermission, id: string, event_control: EventControl): Promise<IEventControlResponse> {
        try {
            let event;
            let contact;
            let opportunity;
            const event_control_exist = access.super_admin === true ?
                await EventControlModel.findOne({ 
                        where: { id },
                        include: [
                            { model: EventModel },
                            { model: ContactModel },
                            { model: OpportunityModel },
                        ]
                    })
                    .then(event_control => event_control)
                    .catch(_error => { throw new EventControlError("Ha occurido un error al revisar el control de evento.") }) :
                await EventControlModel.findOne({ 
                        where: { id, user_id: access.user_id },
                        include: [
                            { model: EventModel },
                            { model: ContactModel },
                            { model: OpportunityModel },
                        ]
                    })
                    .then(event_control => event_control)
                    .catch(_error => { throw new EventControlError("Ha occurido un error al revisar el control de evento.") });

            if (!event_control_exist) throw new EventControlError(`El control de evento con ID ${id} no existe.`);

            event = event_control.event_id !== event_control_exist.dataValues.event?.dataValues.id ?
                await EventModel.findOne({ 
                        where: [
                            { id: event_control.event_id },
                            ...(access.super_admin === false ? [{ user_id: access.user_id }] : [])
                        ]
                    })
                    .then(event => event)
                    .catch(_error => { throw new EventError("El evento proporcionado no existe.") }) :
                event_control_exist.dataValues.event;

            contact = event_control.contact_id !== event_control_exist.dataValues.contact?.dataValues.id ?
                await ContactModel.findOne({
                        where: [
                            { id: event_control.contact_id },
                            ...(access.super_admin === false ? [{ user_id: access.user_id }] : [])
                        ]
                    })
                    .then(contact => contact)
                    .catch(_error => { throw new EventError("El contacto proporcionado no existe.") }) :
                event_control_exist.dataValues.contact;

            opportunity = event_control.opportunity_id !== event_control_exist.dataValues.opportunity?.dataValues.id ?
                await OpportunityModel.findOne({
                        where: [
                            { id: event_control.opportunity_id },
                            ...(access.super_admin === false ? [{ user_id: access.user_id }] : [])
                        ]
                    })
                    .then(opportunity => opportunity)
                    .catch(_error => { throw new EventError("La oportunidad proporcionada no existe.") }) :
                event_control_exist.dataValues.opportunity;

            event_control_exist.set({
                confirmed: event_control.confirmed ?? event_control_exist.dataValues.confirmed,
                attended: event_control.attended ?? event_control_exist.dataValues.attended,
                will_apply: event_control.will_apply ?? event_control_exist.dataValues.will_apply,
                qr_url: event_control.qr_url ?? event_control_exist.dataValues.qr_url,
                event_url: event_control.event_url ?? event_control_exist.dataValues.event_url,
                post_event_url: event_control.post_event_url ?? event_control_exist.dataValues.post_event_url,
                sent_sms: event_control.sent_sms ?? event_control_exist.dataValues.sent_sms,
                sent_email: event_control.sent_email ?? event_control_exist.dataValues.sent_email,
                hidden: event_control.hidden ?? event_control_exist.dataValues.hidden,
                updatedAt: Date.now(),
                event_id: event.dataValues.id,
                contact_id: contact.dataValues.id,
                opportunity_id: opportunity.dataValues.id,
            });

            const updated = await event_control_exist.save()
                .then(event_control => event_control)
                .catch(_error => { throw new EventControlError("Ha ocurrido un error al tratar de actualizar el control de evento.") });

            return EventControlPresenter(updated.dataValues, access, event.dataValues, contact.dataValues, opportunity.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new EventControlError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar el control de evento.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const event_control_exist = access.super_admin === true ?
                await EventControlModel.findByPk(id)
                    .then(event_control => event_control)
                    .catch(_error => { throw new EventControlError("Ha occurido un error al revisar el control de evento.") }) :
                await EventControlModel.findOne({ where: { id, user_id: access.user_id } })
                    .then(event_control => event_control)
                    .catch(_error => { throw new EventControlError("Ha occurido un error al revisar el control de evento.") });

            if (!event_control_exist) throw new EventControlError(`El control de evento con ID ${id} no existe.`);

            event_control_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });

            await event_control_exist.save().catch(_error => { throw new EventControlError("Ha ocurrido un error al tratar de eliminar el control de evento.") });
        } catch (error) {
            if (error instanceof Error && error.message) throw new EventControlError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar el control de evento.");
        }
    }
    async findById(access: IAccessPermission, id: string): Promise<IEventControlResponse> {
        try {
            const event_control_exist = access.super_admin === true ?
                await EventControlModel.findOne({ 
                        where: { id },
                        include: [
                            { model: EventModel },
                            { model: ContactModel },
                            { model: OpportunityModel },
                        ]
                    })
                    .then(event_control => event_control)
                    .catch(_error => { throw new EventControlError("Ha occurido un error al revisar el control de evento.") }) :
                await EventControlModel.findOne({ 
                        where: { id, user_id: access.user_id },
                        include: [
                            { model: EventModel },
                            { model: ContactModel },
                            { model: OpportunityModel },
                        ]
                    })
                    .then(event_control => event_control)
                    .catch(_error => { throw new EventControlError("Ha occurido un error al revisar el control de evento.") });

            if (!event_control_exist) throw new EventControlError(`El control de evento con ID ${id} no existe.`);

            return EventControlPresenter(event_control_exist.dataValues, access, event_control_exist.dataValues.event?.dataValues, event_control_exist.dataValues.contact?.dataValues, event_control_exist.dataValues.opportunity?.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new EventControlError(error.message);
            else throw new Error("Ha ocurrido un error al buscar el control de evento.");
        }
    }
    async findAll(access: IAccessPermission, page: number): Promise<{ event_controls: {}[], total_event_control: number, total_pages: number, current_page: number}> {
        try {
            const event_controls = access.super_admin === true ?
                await EventControlModel.findAndCountAll({
                        include: [
                            { model: EventModel },
                            { model: ContactModel },
                            { model: OpportunityModel },
                        ],
                        limit: 100,
                        offset: (page - 1) * 100,
                    })
                    .then(event_controls => event_controls)
                    .catch(_error => { throw new EventControlError("Ha occurido un error al revisar los controles de eventos.") }) :
                await EventControlModel.findAndCountAll({ 
                        where: [
                            { user_id: access.user_id },
                            ListCondition(access)
                        ],
                        include: [
                            { model: EventModel },
                            { model: ContactModel },
                            { model: OpportunityModel },
                        ],
                        limit: 100,
                        offset: (page - 1) * 100,
                    })
                    .then(event_controls => event_controls)
                    .catch(_error => { throw new EventControlError("Ha occurido un error al revisar los controles de eventos.") });

            return {
                event_controls: event_controls.rows.map(event_control => EventControlPresenter(event_control.dataValues, access, event_control.dataValues.event?.dataValues, event_control.dataValues.contact?.dataValues, event_control.dataValues.opportunity?.dataValues)),
                total_event_control: event_controls.count,
                total_pages: Math.ceil(event_controls.count / 100),
                current_page: page,
            };
        } catch (error) {
            if (error instanceof Error && error.message) throw new EventControlError(error.message);
            else throw new Error("Ha ocurrido un error al listar los controles de eventos.");
        }
    }
}
const eventControlDao = new EventControlDao();
export default eventControlDao;