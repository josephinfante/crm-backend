import { IAccessPermission } from "../../../domain/auth/access.type";
import { Contact } from "../../../domain/contact/contact";
import { ContactRepository } from "../../../domain/contact/contact.repository";
import { ICreateContact } from "../../../domain/contact/contact.type";
import { IContactResponse } from "../../../interfaces/presenters/contact.presenter";

export class ContactCrudUseCase {
    constructor(private readonly contactRepository: ContactRepository) {}
    async create(access: IAccessPermission, contact: ICreateContact): Promise<IContactResponse> {
        return await this.contactRepository.create(access, contact);
    }
    async update(access: IAccessPermission, id: string, contact: Contact): Promise<IContactResponse> {
        return await this.contactRepository.update(access, id, contact);
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        return await this.contactRepository.delete(access, id);
    }
    async findAll(access: IAccessPermission, page: number, value?: string): Promise<{ contacts: {}[], total_contacts: number, total_pages: number, current_page: number}> {
        return await this.contactRepository.findAll(access, page, value);
    }
}