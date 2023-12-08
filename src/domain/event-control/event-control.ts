import { IEventControl } from "./event-control.type";

export class EventControl {
    id: string;
    confirmed: boolean;
    attended: boolean;
    will_apply: boolean;
    qr_url: string;
    event_url: string;
    post_event_url: string;
    sent_sms: boolean;
    sent_email: boolean;
    hidden: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
    event_id: string;
    contact_id: string;
    opportunity_id: string;
    user_id: string | null;
    constructor(event_control: IEventControl) {
        this.id = event_control.id;
        this.confirmed = event_control.confirmed;
        this.attended = event_control.attended;
        this.will_apply = event_control.will_apply;
        this.qr_url = event_control.qr_url;
        this.event_url = event_control.event_url;
        this.post_event_url = event_control.post_event_url;
        this.sent_sms = event_control.sent_sms;
        this.sent_email = event_control.sent_email;
        this.hidden = event_control.hidden;
        this.deleted = event_control.deleted;
        this.createdAt = event_control.createdAt;
        this.updatedAt = event_control.updatedAt;
        this.event_id = event_control.event_id;
        this.contact_id = event_control.contact_id;
        this.opportunity_id = event_control.opportunity_id;
        this.user_id = event_control.user_id;
    }
}