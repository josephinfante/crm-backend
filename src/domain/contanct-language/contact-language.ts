import { IContactLanguage } from "./contact-language.type";

export class ContactLanguage {
    level: string;
    speak: string;
    read: string;
    listen: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    language_id: string;
    contact_id: string;
    user_id: string | null;
    constructor(contact_language: IContactLanguage) {
        this.level = contact_language.level;
        this.speak = contact_language.speak;
        this.read = contact_language.read;
        this.listen = contact_language.listen;
        this.hidden = contact_language.hidden;
        this.deleted = contact_language.deleted;
        this.updatedAt = contact_language.updatedAt;
        this.createdAt = contact_language.createdAt;
        this.language_id = contact_language.language_id;
        this.contact_id = contact_language.contact_id;
        this.user_id = contact_language.user_id;
    }
}