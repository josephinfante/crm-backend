import { IContactChannelResponse } from "../../interfaces/presenters/contact-channel.presenter";
import { IAccessPermission } from "../auth/access.type";
import { ContactChannel } from "./contact-channel";

export interface ContactChannelRepository {
    create(access: IAccessPermission, contact_channel: ContactChannel): Promise<IContactChannelResponse>;
    update(access: IAccessPermission, id: string, contact_channel: ContactChannel): Promise<IContactChannelResponse>;
    delete(access: IAccessPermission, id: string): Promise<string | void>;
    findAll(access: IAccessPermission): Promise<IContactChannelResponse[]>;
}