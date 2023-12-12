import { IAccessPermission } from "../../domain/auth/access.type";
import { IBusinessUnit } from "../../domain/business-unit/business-unit.type";
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
    registration_form_expected: number;
    registration_form_delivered: number;
    registration_form_completed: number;
    registration_form_incompleted: number;
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
        business_unit?: {
            id: string;
            name: string;
        }
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

export function EventPresenter(event: IEvent, access: IAccessPermission, campus: ICampus, college: ICollege, business_unit?: IBusinessUnit): IEventResponse {
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
        registration_form_expected: event.registration_form_expected,
        registration_form_delivered: event.registration_form_delivered,
        registration_form_completed: event.registration_form_completed,
        registration_form_incompleted: event.registration_form_incompleted,
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
            ...(business_unit &&  { business_unit: {
                id: business_unit.id,
                name: business_unit.name,
            }})
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