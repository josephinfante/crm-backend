import { IcontactChannel } from "./contact-channel.type";

export class ContactChannel {
    id: string;
    name: string;
    code: string;
    automatic_assignment: boolean;
    manual_assignment: boolean;
    send_email: boolean;
    send_sms: boolean;
    send_note: boolean;
    expire_days: number;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
    constructor(contact_channel: IcontactChannel) {
        this.id = contact_channel.id;
        this.name = contact_channel.name;
        this.code = contact_channel.code;
        this.automatic_assignment = contact_channel.automatic_assignment;
        this.manual_assignment = contact_channel.manual_assignment;
        this.send_email = contact_channel.send_email;
        this.send_sms = contact_channel.send_sms;
        this.send_note = contact_channel.send_note;
        this.expire_days = contact_channel.expire_days;
        this.hidden = contact_channel.hidden;
        this.deleted = contact_channel.deleted;
        this.updatedAt = contact_channel.updatedAt;
        this.createdAt = contact_channel.createdAt;
        this.user_id = contact_channel.user_id;
    }
}