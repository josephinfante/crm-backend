import { IContactLanguage } from "../../domain/contact-language/contact-language.type";
import { ILanguage } from "../../domain/language/language.type";

export interface IContactLanguageResponse {
    id: string;
    native: boolean;
    level: string;
    speak: string;
    read: string;
    listen: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    language: {
        id: string;
        name: string;
    };
}

export function ContactLanguagePresenter (contact_language: IContactLanguage, language: ILanguage): IContactLanguageResponse {
    return {
        id: contact_language.id,
        native: contact_language.native,
        level: contact_language.level,
        speak: contact_language.speak,
        read: contact_language.read,
        listen: contact_language.listen,
        hidden: contact_language.hidden,
        deleted: contact_language.deleted,
        updatedAt: contact_language.updatedAt,
        createdAt: contact_language.createdAt,
        language: {
            id: language.id,
            name: language.name,
        },
    };
}