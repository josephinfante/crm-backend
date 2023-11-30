import { IContactResponse } from "../../interfaces/presenters/contact.presenter";
import { IAccessPermission } from "../auth/access.type";
import { Contact } from "./contact";
import { ICreateContact } from "./contact.type";

export interface ContactRepository {
    create(access: IAccessPermission, contact: ICreateContact): Promise<IContactResponse>;
    update(access: IAccessPermission, id: string, contact: Contact): Promise<IContactResponse>;
    delete(access: IAccessPermission, id: string): Promise<string | void>;
    findAll(access: IAccessPermission, page: number, value?: string): Promise<{ contacts: {}[], total_contacts: number, total_pages: number, current_page: number}>;
}