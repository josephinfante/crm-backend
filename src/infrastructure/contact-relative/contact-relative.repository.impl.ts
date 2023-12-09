import { IAccessPermission } from "../../domain/auth/access.type";
import { ContactRelative } from "../../domain/contact-relative/contact-relative";
import { ContactRelativeRepository } from "../../domain/contact-relative/contact-relative.repository";
import { IContactRelativeResponse } from "../../interfaces/presenters/contact-relative.presenter";
import contactRelativeDao from "./contact-relative.dao";

export class ContactRelativeRepositoryImpl implements ContactRelativeRepository {
    create(access: IAccessPermission, contact_relative: ContactRelative): Promise<IContactRelativeResponse> {
        return contactRelativeDao.create(access, contact_relative);
    }
    update(access: IAccessPermission, id: string, contact_relative: ContactRelative): Promise<IContactRelativeResponse> {
        return contactRelativeDao.update(access, id, contact_relative);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return contactRelativeDao.delete(access, id);
    }
    findByContactId(access: IAccessPermission, contact_id: string): Promise<IContactRelativeResponse[]> {
        return contactRelativeDao.findByContactId(access, contact_id);
    }
    findById(access: IAccessPermission, id: string): Promise<IContactRelativeResponse> {
        return contactRelativeDao.findById(access, id);
    }
}