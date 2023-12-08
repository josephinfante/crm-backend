import { IAccessPermission } from "../../domain/auth/access.type";
import { IContact } from "../../domain/contact/contact.type";
import { IEventControl } from "../../domain/event-control/event-control.type";
import { IEvent } from "../../domain/event/event.type";
import { IOpportunity } from "../../domain/opportunity/opportunity.type";

export interface IEventControlResponse {
    id: string;
    confirmed: boolean;
    attended: boolean;
    will_apply: boolean;
    qr_url: string;
    event_url: string;
    post_event_url: string;
    sent_sms: boolean;
    sent_email: boolean;
    event: {
        id: string,
        name: string,
    };
    contact: {
        id: string,
        name: string,
    };
    opportunity: {
        id: string,
    };
    hidden: boolean;
    deleted?: boolean;
    createdAt: number;
    updatedAt: number;

}

export function EventControlPresenter(event_control: IEventControl, access: IAccessPermission, event: IEvent, contact: IContact, opportunity: IOpportunity): IEventControlResponse {
    return {
        id: event_control.id,
        confirmed: event_control.confirmed,
        attended: event_control.attended,
        will_apply: event_control.will_apply,
        qr_url: event_control.qr_url,
        event_url: event_control.event_url,
        post_event_url: event_control.post_event_url,
        sent_sms: event_control.sent_sms,
        sent_email: event_control.sent_email,
        event: {
            id: event.id,
            name: event.name,
        },
        contact: {
            id: contact.id,
            name: `${contact.first_name} ${contact.last_name_1}`,
        },
        opportunity: {
            id: opportunity.id,
        },
        hidden: event_control.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: event_control.deleted }),
        createdAt: event_control.createdAt,
        updatedAt: event_control.updatedAt,
    }
}