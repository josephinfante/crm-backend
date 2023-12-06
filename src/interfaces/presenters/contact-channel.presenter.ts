import { IAccessPermission } from "../../domain/auth/access.type";
import { IcontactChannel } from "../../domain/contact-channel/contact-channel.type";

export interface IContactChannelResponse {
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
    deleted?: boolean;
    updatedAt: number;
    createdAt: number;
}

export function ContactChannelPresenter(contact_channel: IcontactChannel, access: IAccessPermission): IContactChannelResponse {
    return {
        id: contact_channel.id,
        name: contact_channel.name,
        code: contact_channel.code,
        automatic_assignment: contact_channel.automatic_assignment,
        manual_assignment: contact_channel.manual_assignment,
        send_email: contact_channel.send_email,
        send_sms: contact_channel.send_sms,
        send_note: contact_channel.send_note,
        expire_days: contact_channel.expire_days,
        hidden: contact_channel.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: contact_channel.deleted }),
        updatedAt: contact_channel.updatedAt,
        createdAt: contact_channel.createdAt,
    }
}