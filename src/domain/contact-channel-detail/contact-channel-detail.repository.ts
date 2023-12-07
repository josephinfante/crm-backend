import { IContactChannelDetailResponse } from "../../interfaces/presenters/contact-channel-detail.presenter";
import { IAccessPermission } from "../auth/access.type";
import { ContactchannelDetail } from "./contact-channel-detail";

export interface ContactChannelDetailRepository {
    create(access: IAccessPermission, contact_channel_detail: ContactchannelDetail): Promise<IContactChannelDetailResponse>;
    update(access: IAccessPermission, id: string, contact_channel_detail: ContactchannelDetail): Promise<IContactChannelDetailResponse>;
    delete(access: IAccessPermission, id: string): Promise<string | void>;
    findByContactChannelId(access: IAccessPermission, contact_channel_id: string): Promise<IContactChannelDetailResponse[]>;
}