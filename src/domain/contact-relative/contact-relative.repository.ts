import { IContactRelativeResponse } from "../../interfaces/presenters/contact-relative.presenter";
import { IAccessPermission } from "../auth/access.type";
import { ContactRelative } from "./contact-relative";

export interface ContactRelativeRepository {
    create(access: IAccessPermission, contact_relative: ContactRelative): Promise<IContactRelativeResponse>;
    update(access: IAccessPermission, id: string, contact_relative: ContactRelative): Promise<IContactRelativeResponse>;
    delete(access: IAccessPermission, id: string): Promise<string | void>;
    findById(access: IAccessPermission, id: string): Promise<IContactRelativeResponse>;
    findByContactId(access: IAccessPermission, contact_id: string): Promise<IContactRelativeResponse[]>;
}