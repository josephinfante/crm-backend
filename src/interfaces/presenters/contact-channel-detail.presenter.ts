import { IAccessPermission } from "../../domain/auth/access.type";
import { IContactChannelDetail } from "../../domain/contact-channel-detail/contact-channel-detail.type";
import { IcontactChannel } from "../../domain/contact-channel/contact-channel.type";

export interface IContactChannelDetailResponse {
    id: string;
    name: string;
    contact_channel: {
        id: string;
        name: string;
    };
    hidden: boolean;
    deleted?: boolean;
    createdAt: number;
    updatedAt: number;
}

export function ContactChannelDetailPresenter(contact_channel_detail: IContactChannelDetail, access: IAccessPermission, contact_channel: IcontactChannel): IContactChannelDetailResponse {
    return {
        id: contact_channel_detail.id,
        name: contact_channel_detail.name,
        contact_channel: {
            id: contact_channel.id,
            name: contact_channel.name,
        },
        hidden: contact_channel_detail.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: contact_channel_detail.deleted }),
        createdAt: contact_channel_detail.createdAt,
        updatedAt: contact_channel_detail.updatedAt,
    }
}