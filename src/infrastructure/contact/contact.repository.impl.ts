import { IAccessPermission } from "../../domain/auth/access.type";
import { Contact } from "../../domain/contact/contact";
import { ContactRepository } from "../../domain/contact/contact.repository";
import { IContactResponse } from "../../interfaces/presenters/contact.presenter";
import contactDao from "./contact.dao";

export class ContactRepositoryImpl implements ContactRepository {
    create(access: IAccessPermission, contact: Contact): Promise<IContactResponse> {
        return contactDao.create(access, contact);
    }
    update(access: IAccessPermission, id: string, contact: Contact): Promise<IContactResponse> {
        return contactDao.update(access, id, contact);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return contactDao.delete(access, id);
    }
    findAll(access: IAccessPermission, page: number, value?: string | undefined): Promise<{ contacts: {}[]; total_contacts: number; total_pages: number; current_page: number; }> {
        return contactDao.findAll(access, page, value);
    }
}