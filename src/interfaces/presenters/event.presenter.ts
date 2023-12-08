import { IAccessPermission } from "../../domain/auth/access.type";
import { ICampus } from "../../domain/campus/campus.type";
import { ICollege } from "../../domain/college/college.type";
import { IEvent } from "../../domain/event/event.type";

export interface IEventResponse {
    id: string;
    name: string;
    code: string;
    type: string;
    address: string;
    campaign_start_date: number;
    start_date: number;
    end_date: number;
    waiting_time: number;
    send_sms: boolean;
    send_email: boolean;
    registration_from_expected: number;
    registration_from_delivered: number;
    registration_from_completed: number;
    registration_from_incompleted: number;
    virtual: boolean;
    pre_inscription_url: string;
    post_event_url: string;
    meeting_url: string;
    survery_url: string;
    send_survey: boolean;
    sent_pre_inscription: boolean;
    inscription_type: string;
    campus: {
        id: string;
        name: string;
    };
    college: {
        id: string;
        name: string;
    };
    hidden: boolean;
    deleted?: boolean;
    createdAt: number;
    updatedAt: number;
}

export function EventPresenter(event: IEvent, access: IAccessPermission, campus: ICampus, college: ICollege): IEventResponse {
    return {
        id: event.id,
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
        campus: {
            id: campus.id,
            name: campus.name,
        },
        college: {
            id: college.id,
            name: college.name,
        },
        hidden: event.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: event.deleted }),
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
    }
}