import { IAccessPermission } from "../../../domain/auth/access.type";
import { ContactchannelDetail } from "../../../domain/contact-channel-detail/contact-channel-detail";
import { ContactChannelDetailRepository } from "../../../domain/contact-channel-detail/contact-channel-detail.repository";
import { IContactChannelDetailResponse } from "../../../interfaces/presenters/contact-channel-detail.presenter";

export class ContactChannelDetailCrudUseCase {
    constructor(private readonly contactChannelDetailRepository: ContactChannelDetailRepository) { }
    async create(access: IAccessPermission, contact_channel_detail: ContactchannelDetail): Promise<IContactChannelDetailResponse> {
        return await this.contactChannelDetailRepository.create(access, contact_channel_detail);
    }
    async update(access: IAccessPermission, id: string, contact_channel_detail: ContactchannelDetail): Promise<IContactChannelDetailResponse> {
        return await this.contactChannelDetailRepository.update(access, id, contact_channel_detail);
    }
    async delete(access: IAccessPermission, id: string): Promise<void | string> {
        return await this.contactChannelDetailRepository.delete(access, id);
    }
    async findByContactChannelId(access: IAccessPermission, contact_channel_id: string): Promise<IContactChannelDetailResponse[]> {
        return await this.contactChannelDetailRepository.findByContactChannelId(access, contact_channel_id);
    }
}