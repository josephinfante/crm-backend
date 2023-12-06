import { IAccessPermission } from "../../../domain/auth/access.type";
import { ContactChannel } from "../../../domain/contact-channel/contact-channel";
import { ContactChannelRepository } from "../../../domain/contact-channel/contact-channel.repository";
import { IContactChannelResponse } from "../../../interfaces/presenters/contact-channel.presenter";

export class ContactChannelCrudUseCase {
    constructor(private readonly contactChannelRepository: ContactChannelRepository) {}
    async create(access: IAccessPermission, contact_channel: ContactChannel): Promise<IContactChannelResponse> {
        return await this.contactChannelRepository.create(access, contact_channel);
    }
    async update(access: IAccessPermission, id: string, contact_channel: ContactChannel): Promise<IContactChannelResponse> {
        return await this.contactChannelRepository.update(access, id, contact_channel);
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        return await this.contactChannelRepository.delete(access, id);
    }
    async findAll(access: IAccessPermission): Promise<IContactChannelResponse[]> {
        return await this.contactChannelRepository.findAll(access);
    }
}