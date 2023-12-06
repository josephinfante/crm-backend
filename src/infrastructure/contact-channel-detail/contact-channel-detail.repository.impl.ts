import { IAccessPermission } from "../../domain/auth/access.type";
import { ContactchannelDetail } from "../../domain/contact-channel-detail/contact-channel-detail";
import { ContactChannelDetailRepository } from "../../domain/contact-channel-detail/contact-channel-detail.repository";
import { IContactChannelDetailResponse } from "../../interfaces/presenters/contact-channel-detail.presenter";
import contactChannelDetailDao from "./contact-channel-detail.dao";

export class ContactChannelDetailRepositoryImpl implements ContactChannelDetailRepository {
    create(access: IAccessPermission, contact_channel_detail: ContactchannelDetail): Promise<IContactChannelDetailResponse> {
        return contactChannelDetailDao.create(access, contact_channel_detail);
    }
    update(access: IAccessPermission, id: string, contact_channel_detail: ContactchannelDetail): Promise<IContactChannelDetailResponse> {
        return contactChannelDetailDao.update(access, id, contact_channel_detail);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return contactChannelDetailDao.delete(access, id);
    }
    findByContactChannelId(access: IAccessPermission, contact_channel_id: string): Promise<IContactChannelDetailResponse[]> {
        return contactChannelDetailDao.findByContactChannelId(access, contact_channel_id);
    }
}