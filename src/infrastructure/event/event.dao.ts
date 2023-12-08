import { IAccessPermission } from "../../domain/auth/access.type";
import { Event } from "../../domain/event/event";
import { EventPresenter, IEventResponse } from "../../interfaces/presenters/event.presenter";
import { CampusError, CollegeError, EventError } from "../../shared/errors";
import { CampusModel, CollegeModel, EventModel } from "../../shared/models";
import { ListCondition, UniqueID } from "../../shared/utils";

class EvenDao {
    async create(access: IAccessPermission, event: Event): Promise<IEventResponse> {
        try {
            const campus_exist = access.super_admin === true ?
                await CampusModel.findByPk(event.campus_id)
                    .then(campus => campus)
                    .catch((_error) => { throw new CampusError("Ha ocurrido un error al revisar la sede.") }) :
                await CampusModel.findOne({ where: { id: event.campus_id, user_id: access.user_id }})
                    .then(campus => campus)
                    .catch((_error) => { throw new CampusError("Ha ocurrido un error al revisar la sede.") });

            if (!campus_exist) throw new CampusError("La sede proporsionada no existe.");

            const college_exist = access.super_admin === true ?
                await CollegeModel.findByPk(event.college_id)
                    .then(college => college)
                    .catch((_error) => { throw new CollegeError("Ha ocurrido un error al revisar la institución educativa.") }) :
                await CollegeModel.findOne({ where: { id: event.college_id, user_id: access.user_id }})
                    .then(college => college)
                    .catch((_error) => { throw new CollegeError("Ha ocurrido un error al revisar la institución educativa.") });

            if (!college_exist) throw new CollegeError("La institución educativa proporsionada no existe.");

            const new_event = {
                id: UniqueID.generate(),
                name: event.name,
                code: event.code,
                type: event.type,
                address: event.address,
                campaign_start_date: event.campaign_start_date,
                start_date: event.start_date,
                end_date: event.end_date,
                waiting_time: event.waiting_time,
                send_sms: event.send_sms,
                send_email: event.send_email,
                registration_from_expected: event.registration_from_expected,
                registration_from_delivered: event.registration_from_delivered,
                registration_from_completed: event.registration_from_completed,
                registration_from_incompleted: event.registration_from_incompleted,
                virtual: event.virtual,
                pre_inscription_url: event.pre_inscription_url,
                post_event_url: event.post_event_url,
                meeting_url: event.meeting_url,
                survery_url: event.survery_url,
                send_survey: event.send_survey,
                sent_pre_inscription: event.sent_pre_inscription,
                inscription_type: event.inscription_type,
                campus_id: event.campus_id,
                college_id: event.college_id,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                user_id: access.user_id
            }

            await EventModel.create(new_event).catch((_error) => { throw new EventError("Ha ocurrido un error al tratar de crear el evento.") });
            return EventPresenter(new_event, access, campus_exist.dataValues, college_exist.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new EventError(error.message);
            else throw new Error('Ha ocurrido un error al crear el evento.');
        }
    }
    async update(access: IAccessPermission, id: string, event: Event): Promise<IEventResponse> {
        try {
            let campus;
            let college;
            const event_exist = access.super_admin === true ?
                await EventModel.findOne({ 
                        where: { id: id },
                        include: [{ model: CampusModel }, { model: CollegeModel }]
                    })
                    .then(event => event)
                    .catch((_error) => { throw new EventError("Ha ocurrido un error al revisar el evento.") }) :
                await EventModel.findOne({ 
                        where: { id, user_id: access.user_id },
                        include: [{ model: CampusModel }, { model: CollegeModel }]
                    })
                    .then(event => event)
                    .catch((_error) => { throw new EventError("Ha ocurrido un error al revisar el evento.") });

            if (!event_exist) throw new EventError("El evento no existe.");

            campus = event.campus_id !== event_exist.dataValues.campus?.dataValues.id ?
                    await CampusModel.findOne({ 
                            where: [
                                { id: event.campus_id },
                                ...(access.super_admin === false ? [{ user_id: access.user_id }] : [])
                            ]
                        })
                        .then(campus => campus)
                        .catch((_error) => { throw new CampusError("Ha ocurrido un error al revisar la sede.") }) :
                    event_exist.dataValues.campus;

            college = event.college_id !== event_exist.dataValues.college?.dataValues.id ?
                    await CollegeModel.findOne({ 
                            where: [
                                { id: event.college_id },
                                ...(access.super_admin === false ? [{ user_id: access.user_id }] : [])
                            ]
                        })
                        .then(college => college)
                        .catch((_error) => { throw new CollegeError("Ha ocurrido un error al revisar la institución educativa.") }) :
                    event_exist.dataValues.college;

            event_exist.set({
                name: event.name ?? event_exist.dataValues.name,
                code: event.code ?? event_exist.dataValues.code,
                type: event.type ?? event_exist.dataValues.type,
                address: event.address ?? event_exist.dataValues.address,
                campaign_start_date: event.campaign_start_date ?? event_exist.dataValues.campaign_start_date,
                start_date: event.start_date ?? event_exist.dataValues.start_date,
                end_date: event.end_date ?? event_exist.dataValues.end_date,
                waiting_time: event.waiting_time ?? event_exist.dataValues.waiting_time,
                send_sms: event.send_sms ?? event_exist.dataValues.send_sms,
                send_email: event.send_email ?? event_exist.dataValues.send_email,
                registration_from_expected: event.registration_from_expected ?? event_exist.dataValues.registration_from_expected,
                registration_from_delivered: event.registration_from_delivered ?? event_exist.dataValues.registration_from_delivered,
                registration_from_completed: event.registration_from_completed ?? event_exist.dataValues.registration_from_completed,
                registration_from_incompleted: event.registration_from_incompleted ?? event_exist.dataValues.registration_from_incompleted,
                virtual: event.virtual ?? event_exist.dataValues.virtual,
                pre_inscription_url: event.pre_inscription_url ?? event_exist.dataValues.pre_inscription_url,
                post_event_url: event.post_event_url ?? event_exist.dataValues.post_event_url,
                meeting_url: event.meeting_url ?? event_exist.dataValues.meeting_url,
                survery_url: event.survery_url ?? event_exist.dataValues.survery_url,
                send_survey: event.send_survey ?? event_exist.dataValues.send_survey,
                sent_pre_inscription: event.sent_pre_inscription ?? event_exist.dataValues.sent_pre_inscription,
                inscription_type: event.inscription_type ?? event_exist.dataValues.inscription_type,
                campus_id: campus.dataValues.id,
                college_id: college.dataValues.id,
                hidden: event.hidden ?? event_exist.dataValues.hidden,
                deleted: event.deleted ?? event_exist.dataValues.deleted,
                updatedAt: Date.now(),
            });

            const updated = await event_exist.save()
                .then(event => event)
                .catch((_error) => { throw new EventError("Ha ocurrido un error al tratar de actualizar el evento.") });

            return EventPresenter(updated.dataValues, access, campus.dataValues, college.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new EventError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar el evento.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const event_exist = access.super_admin === true ?
                await EventModel.findByPk(id)
                    .then(event => event)
                    .catch((_error) => { throw new EventError("Ha ocurrido un error al revisar el evento.") }) :
                await EventModel.findOne({ where: { id: id, user_id: access.user_id } })
                    .then(event => event)
                    .catch((_error) => { throw new EventError("Ha ocurrido un error al revisar el evento.") });

            if (!event_exist) throw new EventError("El evento no existe.");

            event_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });

            await event_exist.save().catch((_error) => { throw new EventError("Ha ocurrido un error al tratar de eliminar el evento.") });
        } catch (error) {
            if (error instanceof Error && error.message) throw new EventError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar el evento.");
        }
    }
    async findById(access: IAccessPermission, id: string): Promise<IEventResponse> {
        try {
            const event_exist = access.super_admin === true ?
                await EventModel.findOne({ 
                        where: { id: id },
                        include: [{ model: CampusModel }, { model: CollegeModel }]
                    })
                    .then(event => event)
                    .catch((_error) => { throw new EventError("Ha ocurrido un error al revisar el evento.") }) :
                await EventModel.findOne({ 
                        where: { id, user_id: access.user_id },
                        include: [{ model: CampusModel }, { model: CollegeModel }]
                    })
                    .then(event => event)
                    .catch((_error) => { throw new EventError("Ha ocurrido un error al revisar el evento.") });

            if (!event_exist) throw new EventError("El evento no existe.");

            return EventPresenter(event_exist.dataValues, access, event_exist.dataValues.campus.dataValues, event_exist.dataValues.college.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new EventError(error.message);
            else throw new Error("Ha ocurrido un error al obtener el evento.");
        }
    }
    async findAll(access: IAccessPermission, page: number): Promise<{ events: {}[], total_events: number, total_pages: number, current_page: number}> {
        try {
            const events = access.super_admin === true ?
                await EventModel.findAndCountAll({
                        include: [{ model: CampusModel }, { model: CollegeModel }],
                        limit: 100,
                        offset: (page - 1) * 100,
                    })
                    .then(events => events)
                    .catch((_error) => { throw new EventError("Ha ocurrido un error al obtener los eventos.") }) :
                await EventModel.findAndCountAll({
                        where: [
                            { user_id: access.user_id },
                            ListCondition(access)
                        ],
                        include: [{ model: CampusModel }, { model: CollegeModel }],
                        limit: 100,
                        offset: (page - 1) * 100,
                    })
                    .then(events => events)
                    .catch((_error) => { throw new EventError("Ha ocurrido un error al obtener los eventos.") });
            
            return {
                events: events.rows.map(event => EventPresenter(event.dataValues, access, event.dataValues.campus.dataValues, event.dataValues.college.dataValues)),
                total_events: events.count,
                total_pages: Math.ceil(events.count / 10),
                current_page: page,
            };
        } catch (error) {
            if (error instanceof Error && error.message) throw new EventError(error.message);
            else throw new Error("Ha ocurrido un error al obtener los eventos.");
        }
    }
}
const eventDao = new EvenDao();
export default eventDao;