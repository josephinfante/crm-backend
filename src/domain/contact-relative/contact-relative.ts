import { IContactRelative } from "./contact-relative.type";

export class ContactRelative {
    id: string;
    relationship: string;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    contact_id: string;
    relative_id: string;
    user_id: string | null;
    constructor(contact_relative: IContactRelative) {
        this.id = contact_relative.id;
        this.relationship = contact_relative.relationship;
        this.deleted = contact_relative.deleted;
        this.updatedAt = contact_relative.updatedAt;
        this.createdAt = contact_relative.createdAt;
        this.contact_id = contact_relative.contact_id;
        this.relative_id = contact_relative.relative_id;
        this.user_id = contact_relative.user_id;
    }
}