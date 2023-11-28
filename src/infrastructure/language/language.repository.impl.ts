import { IAccessPermission } from "../../domain/auth/access.type";
import { Language } from "../../domain/language/language";
import { LanguageRepository } from "../../domain/language/language.repository";
import { ILanguageResponse } from "../../interfaces/presenters/language.presenter";
import languageDao from "./language.dao";

export class LanguageRepositoryImpl implements LanguageRepository {
    create(access: IAccessPermission, language: Language): Promise<ILanguageResponse> {
        return languageDao.create(access, language)
    }
    update(access: IAccessPermission, id: string, language: Language): Promise<ILanguageResponse> {
        return languageDao.update(access, id, language)
    }
    delete(access: IAccessPermission, id: string): Promise<string> {
        return languageDao.delete(access, id)
    }
    findAll(access: IAccessPermission, language?: string | undefined): Promise<ILanguageResponse[]> {
        return languageDao.findAll(access, language)
    }
}