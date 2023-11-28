import { ILanguage } from "./language.type";

export class Language {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
    constructor(language: ILanguage) {
        this.id = language.id;
        this.name = language.name;
        this.code = language.code;
        this.hidden = language.hidden;
        this.deleted = language.deleted;
        this.updatedAt = language.updatedAt;
        this.createdAt = language.createdAt;
        this.user_id = language.user_id;
    }
}