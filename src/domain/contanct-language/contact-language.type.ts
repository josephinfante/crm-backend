export interface ICreateContactLanguage {
    level: string;
    speak: string;
    read: string;
    listen: string;
    language_id: string;
    contact_id: string;
}

export interface IUpdateContactLanguage extends ICreateContactLanguage {}

export interface IContactLanguage extends ICreateContactLanguage {
    id: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
}