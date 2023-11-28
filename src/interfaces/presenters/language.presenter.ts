import { IAccessPermission } from "../../domain/auth/access.type";
import { ILanguage } from "../../domain/language/language.type";

export interface ILanguageResponse {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted?: boolean;
    updatedAt: number;
    createdAt: number;
}

export function LanguagePresenter(language: ILanguage, access: IAccessPermission): ILanguageResponse {
    return {
        id: language.id,
        name: language.name,
        code: language.code,
        hidden: language.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: language.deleted }),
        updatedAt: language.updatedAt,
        createdAt: language.createdAt,
    }
}