import { IContactChannelDetail } from "./contact-channel-detail.type";

export class ContactchannelDetail {
    id: string;
    name: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    contact_channel_id: string;
    user_id: string | null;
    constructor(contact_channel_detail: IContactChannelDetail) {
        this.id = contact_channel_detail.id;
        this.name = contact_channel_detail.name;
        this.hidden = contact_channel_detail.hidden;
        this.deleted = contact_channel_detail.deleted;
        this.updatedAt = contact_channel_detail.updatedAt;
        this.createdAt = contact_channel_detail.createdAt;
        this.contact_channel_id = contact_channel_detail.contact_channel_id;
        this.user_id = contact_channel_detail.user_id;
    }
}