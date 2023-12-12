import { IAccessPermission } from "../../../domain/auth/access.type";
import { ContactRelative } from "../../../domain/contact-relative/contact-relative";
import { ContactRelativeRepository } from "../../../domain/contact-relative/contact-relative.repository";
import { IContactRelativeResponse } from "../../../interfaces/presenters/contact-relative.presenter";

export class ContactRelativeCrudUseCase {
    constructor(private readonly contactRelativeRepository: ContactRelativeRepository) { }
    async create(access: IAccessPermission, contact_relative: ContactRelative): Promise<IContactRelativeResponse> {
        return await this.contactRelativeRepository.create(access, contact_relative);
    }
    async update(access: IAccessPermission, id: string, contact_relative: ContactRelative): Promise<IContactRelativeResponse> {
        return await this.contactRelativeRepository.update(access, id, contact_relative);
    }
    async delete(access: IAccessPermission, id: string): Promise<void | string> {
        return await this.contactRelativeRepository.delete(access, id);
    }
    async findByContactId(access: IAccessPermission, contact_id: string): Promise<IContactRelativeResponse[]> {
        return await this.contactRelativeRepository.findByContactId(access, contact_id);
    }
    async findById(access: IAccessPermission, id: string): Promise<IContactRelativeResponse> {
        return await this.contactRelativeRepository.findById(access, id);
    }
}