import { ILanguageResponse } from "../../interfaces/presenters/language.presenter";
import { IAccessPermission } from "../auth/access.type";
import { Language } from "./language";

export interface LanguageRepository {
    create(access: IAccessPermission, language: Language): Promise<ILanguageResponse>;
    update(access: IAccessPermission, id: string, language: Language): Promise<ILanguageResponse>;
    delete(access: IAccessPermission, id: string): Promise<string>;
    findAll(access: IAccessPermission, language?: string): Promise<ILanguageResponse[]>;
}