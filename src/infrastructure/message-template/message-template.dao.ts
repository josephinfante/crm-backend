import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { UniqueID } from "../../shared/utils";
import { IMessageTemplateResponse, MessageTemplatePresenter } from "../../interfaces/presenters/message-template.presenter";
import { MessageTemplate } from "../../domain/message-template/message-template";
import { MessageTemplateModel, BusinessUnitModel, ContactChannelModel, SalePhaseModel, CampusModel, CareerModel, EventModel } from "../../shared/models";
import { MessageTemplateError, BusinessUnitError, ContactChannelError, SalePhaseError, CampusError, CareerError } from "../../shared/errors";

class MessageTemplateDao {
    async create(access: IAccessPermission, message_template: MessageTemplate){
        try {
            let business_unit;
            let contact_channel;
            let sale_phase;
            let campus;
            let career;
            let event;
            if (message_template.business_unit_id) {
                business_unit = await BusinessUnitModel.findByPk(message_template.business_unit_id)
                    .then(business_unit => business_unit)
                    .catch((_error) => { throw new BusinessUnitError("La unidad de negocio no existe.") });
            }
            if (message_template.contact_channel_id) {
                contact_channel = await ContactChannelModel.findByPk(message_template.contact_channel_id)
                    .then(contact_channel => contact_channel)
                    .catch((_error) => { throw new ContactChannelError("El canal de contacto no existe.") });
            }
            if (message_template.sale_phase_id) {
                sale_phase = await SalePhaseModel.findByPk(message_template.sale_phase_id)
                    .then(sale_phase => sale_phase)
                    .catch((_error) => { throw new SalePhaseError("La fase de venta no existe.") });
            }
            if (message_template.campus_id) {
                campus = await CampusModel.findByPk(message_template.campus_id)
                    .then(campus => campus)
                    .catch((_error) => { throw new CampusError("El campus no existe.") });
            }
            if (message_template.career_id) {
                career = await CareerModel.findByPk(message_template.career_id)
                    .then(career => career)
                    .catch((_error) => { throw new CareerError("La carrera no existe.") });
            }
            if (message_template.event_id) {
                event = await EventModel.findByPk(message_template.event_id)
                    .then(event => event)
                    .catch((_error) => { throw new Error("El evento no existe.") });
            }
            const new_message_template = {
                id: UniqueID.generate(),
                name: message_template.name,
                subject: message_template.subject,
                body: message_template.body,
                cco: message_template.cco,
                type: message_template.type,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                business_unit_id: message_template.business_unit_id,
                contact_channel_id: message_template.contact_channel_id,
                sale_phase_id: message_template.sale_phase_id,
                campus_id: message_template.campus_id,
                career_id: message_template.career_id,
                event_id: message_template.event_id,
                user_id: access.user_id,
            }
            const [_message_template, created] = await MessageTemplateModel.findOrCreate({
                    where: {
                        [Op.and]: [
                            { business_unit_id: message_template.business_unit_id },
                            { contact_channel_id: message_template.contact_channel_id },
                            { sale_phase_id: message_template.sale_phase_id },
                            { campus_id: message_template.campus_id },
                            { career_id: message_template.career_id },
                            { event_id: message_template.event_id },
                            { name: message_template.name }
                        ]
                    },
                    defaults: new_message_template,
                })
                .then(message_template => message_template)
                .catch(_error => { throw new MessageTemplateError("Ha ocurrido un error al tratar de crear la plantilla.")});
            if (!created) throw new MessageTemplateError("La plantilla ya existe.");
            return MessageTemplatePresenter(new_message_template, access, business_unit?.dataValues, contact_channel?.dataValues, sale_phase?.dataValues, campus?.dataValues, career?.dataValues, event?.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new MessageTemplateError(error.message);
            else throw new Error("Ha ocurrido un error al crear la plantilla.");
        }
    }
    async update(access: IAccessPermission, id: string, message_template: MessageTemplate): Promise<IMessageTemplateResponse> {
        try {
            let business_unit;
            let contact_channel;
            let sale_phase;
            let campus;
            let career;
            let event;
            const message_template_exist = access.super_admin === true ?
                await MessageTemplateModel.findOne({ where: { id: id } })
                    .then(message_template => message_template)
                    .catch((_error) => { throw new MessageTemplateError("Ha ocurrido un error al revisar la plantilla.") }) :
                await MessageTemplateModel.findOne({ where: { id: id, user_id: access.user_id } })
                    .then(message_template => message_template)
                    .catch((_error) => { throw new MessageTemplateError("Ha ocurrido un error al revisar la plantilla.") });

            if (!message_template_exist) throw new MessageTemplateError("La plantilla no existe.");
            
            if (message_template.business_unit_id) {
                business_unit = await BusinessUnitModel.findByPk(message_template.business_unit_id)
                    .then(business_unit => business_unit)
                    .catch((_error) => { throw new BusinessUnitError("La unidad de negocio no existe.") });
            }
            if (message_template.contact_channel_id) {
                contact_channel = await ContactChannelModel.findByPk(message_template.contact_channel_id)
                    .then(contact_channel => contact_channel)
                    .catch((_error) => { throw new ContactChannelError("El canal de contacto no existe.") });
            }
            if (message_template.sale_phase_id) {
                sale_phase = await SalePhaseModel.findByPk(message_template.sale_phase_id)
                    .then(sale_phase => sale_phase)
                    .catch((_error) => { throw new SalePhaseError("La fase de venta no existe.") });
            }
            if (message_template.campus_id) {
                campus = await CampusModel.findByPk(message_template.campus_id)
                    .then(campus => campus)
                    .catch((_error) => { throw new CampusError("El campus no existe.") });
            }
            if (message_template.career_id) {
                career = await CareerModel.findByPk(message_template.career_id)
                    .then(career => career)
                    .catch((_error) => { throw new CareerError("La carrera no existe.") });
            }
            if (message_template.event_id) {
                event = await EventModel.findByPk(message_template.event_id)
                    .then(event => event)
                    .catch((_error) => { throw new Error("El evento no existe.") });
            }

            const message_template_coincidence = ( message_template.name !== message_template_exist.dataValues.name 
                || message_template.business_unit_id !== message_template_exist.dataValues.business_unit_id 
                || message_template.contact_channel_id !== message_template_exist.dataValues.contact_channel_id 
                || message_template.sale_phase_id !== message_template_exist.dataValues.sale_phase_id
                || message_template.campus_id !== message_template_exist.dataValues.campus_id
                || message_template.career_id !== message_template_exist.dataValues.career_id
                || message_template.event_id !== message_template_exist.dataValues.event_id) ? 
                await MessageTemplateModel.findAll({
                        where: {
                            [Op.and]: [
                                { name: message_template.name },
                                ...( access.super_admin === false ? [{ user_id: access.user_id }] : [] ),
                                ...( message_template.business_unit_id !== message_template_exist.dataValues.business_unit_id ? [ { business_unit_id: message_template.business_unit_id } ] : [] ),
                                ...( message_template.contact_channel_id !== message_template_exist.dataValues.contact_channel_id ? [ { contact_channel_id: message_template.contact_channel_id } ] : [] ),
                                ...( message_template.sale_phase_id !== message_template_exist.dataValues.sale_phase_id ? [ { sale_phase_id: message_template.sale_phase_id } ] : [] ),
                                ...( message_template.campus_id !== message_template_exist.dataValues.campus_id ? [ { campus_id: message_template.campus_id } ] : [] ),
                                ...( message_template.career_id !== message_template_exist.dataValues.career_id ? [ { career_id: message_template.career_id } ] : [] ),
                                ...( message_template.event_id !== message_template_exist.dataValues.event_id ? [ { event_id: message_template.event_id } ] : [] ),
                                { id: { [ Op.ne ]: id } }
                            ]
                        }
                    })
                    .then(message_templates => message_templates)
                    .catch((_error) => { throw new MessageTemplateError("Ha ocurrido un error al revisar las sedes.") }) : [];

            if (message_template_coincidence.length > 0) throw new MessageTemplateError("Ya existe una sede con los datos proporcionados.");
            message_template_exist.set({
                name: message_template.name ?? message_template_exist.dataValues.name,
                subject: message_template.subject ?? message_template_exist.dataValues.subject,
                body: message_template.body ?? message_template_exist.dataValues.body,
                cco: message_template.cco ?? message_template_exist.dataValues.cco,
                type: message_template.type ?? message_template_exist.dataValues.type,
                hidden: message_template.hidden ?? message_template_exist.dataValues.hidden,
                business_unit_id: message_template.business_unit_id,
                contact_channel_id: message_template.contact_channel_id,
                sale_phase_id: message_template.sale_phase_id,
                campus_id: message_template.campus_id,
                career_id: message_template.career_id,
                event_id: message_template.event_id,
                updatedAt: Date.now(),
            });

            const updated = await message_template_exist.save()
                .then(message_template => message_template)
                .catch((_error) => { throw new MessageTemplateError("Ha ocurrido un error al tratar de actualizar La plantilla.") });

            return MessageTemplatePresenter(updated.dataValues, access, business_unit?.dataValues, contact_channel?.dataValues, sale_phase?.dataValues, campus?.dataValues, career?.dataValues, event?.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new MessageTemplateError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar La plantilla.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const message_template_exist = access.super_admin === true ?
                await MessageTemplateModel.findOne({ where: { id: id } })
                    .then(message_template => message_template)
                    .catch((_error) => { throw new MessageTemplateError("Ha ocurrido un error al revisar La plantilla.") }) :
                await MessageTemplateModel.findOne({ where: { id: id, user_id: access.user_id } })
                    .then(message_template => message_template)
                    .catch((_error) => { throw new MessageTemplateError("Ha ocurrido un error al revisar La plantilla.") });

            if (!message_template_exist) throw new MessageTemplateError("La plantilla no existe.");

            message_template_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });

            await message_template_exist.save().catch((_error) => { throw new MessageTemplateError("Ha ocurrido un error al tratar de eliminar La plantilla.") });
        } catch (error) {
            if (error instanceof Error && error.message) throw new MessageTemplateError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar La plantilla.");
        }
    }
    async findById(access: IAccessPermission, id: string): Promise<IMessageTemplateResponse> {
        try {
            const opportunity_exist = access.super_admin === true ?
                await MessageTemplateModel.findOne({
                        where: { id: id },
                        include: [
                            { model: BusinessUnitModel },
                            { model: ContactChannelModel },
                            { model: SalePhaseModel },
                            { model: CampusModel },
                            { model: CareerModel },
                            { model: EventModel },
                        ]
                    })
                    .then(opportunity => opportunity)
                    .catch((_error) => { throw new MessageTemplateError("Ha ocurrido un error al revisar la oportunidad.") }) :
                await MessageTemplateModel.findOne({ 
                        where: { id: id, user_id: access.user_id },
                        include: [
                            { model: BusinessUnitModel },
                            { model: ContactChannelModel },
                            { model: SalePhaseModel },
                            { model: CampusModel },
                            { model: CareerModel },
                            { model: EventModel },
                        ]
                    })
                    .then(opportunity => opportunity)
                    .catch((_error) => { throw new MessageTemplateError("Ha ocurrido un error al revisar la oportunidad.") });

            if (!opportunity_exist) throw new MessageTemplateError(`La oportunidad con ID ${id} no existe.`);

            return MessageTemplatePresenter(opportunity_exist.dataValues, access, opportunity_exist.dataValues.business_unit?.dataValues, opportunity_exist.dataValues.contact_channel?.dataValues, opportunity_exist.dataValues.sales_phase?.dataValues, opportunity_exist.dataValues.campus?.dataValues, opportunity_exist.dataValues.career?.dataValues, opportunity_exist.dataValues.event?.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new MessageTemplateError(error.message);
            else throw new Error("Ha ocurrido un error al buscar la oportunidad.");
        }
    }
    async findAll(access: IAccessPermission): Promise<IMessageTemplateResponse[]> {
        try {
            const message_templates = await MessageTemplateModel.findAll({ 
                where: [
                    ...(access.super_admin === false?[{ user_id: access.user_id }]:[]),
                ],
                include: [
                    { model: BusinessUnitModel },
                    { model: ContactChannelModel },
                    { model: SalePhaseModel },
                    { model: CampusModel },
                    { model: CareerModel },
                    { model: EventModel },
                ]
            })
            .then(opportunity => opportunity)
            .catch((_error) => { throw new MessageTemplateError("Ha ocurrido un error al revisar la oportunidad.") });

            return message_templates.map(message_template => MessageTemplatePresenter(message_template.dataValues, access, message_template.dataValues.business_unit?.dataValues, message_template.dataValues.contact_channel?.dataValues, message_template.dataValues.sales_phase?.dataValues, message_template.dataValues.campus?.dataValues, message_template.dataValues.career?.dataValues, message_template.dataValues.event?.dataValues));
        } catch (error) {
            if (error instanceof Error && error.message) throw new MessageTemplateError(error.message);
            else throw new Error("Ha ocurrido un error al buscar la oportunidad.");
        }
    }
}
const messageTemplateDao = new MessageTemplateDao();
export default messageTemplateDao;