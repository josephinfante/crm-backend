import { IAccessPermission } from "../../domain/auth/access.type";
import { ContactChannel } from "../../domain/contact-channel/contact-channel";
import { ContactChannelRepository } from "../../domain/contact-channel/contact-channel.repository";
import { IContactChannelResponse } from "../../interfaces/presenters/contact-channel.presenter";
import contactChannelDao from "./contact-channel.dao";

export class ContactChannelRepositoryImpl implements ContactChannelRepository {
    create(access: IAccessPermission, contact_channel: ContactChannel): Promise<IContactChannelResponse> {
        return contactChannelDao.create(access, contact_channel);
    }
    update(access: IAccessPermission, id: string, contact_channel: ContactChannel): Promise<IContactChannelResponse> {
        return contactChannelDao.update(access, id, contact_channel);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return contactChannelDao.delete(access, id);
    }
    findAll(access: IAccessPermission): Promise<IContactChannelResponse[]> {
        return contactChannelDao.findAll(access);
    }
}