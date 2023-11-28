import { IAccessPermission } from "../../../domain/auth/access.type";
import { Language } from "../../../domain/language/language";
import { LanguageRepository } from "../../../domain/language/language.repository";
import { ILanguageResponse } from "../../../interfaces/presenters/language.presenter";

export class LanguageCrudUseCase {
    constructor(private readonly languageRepository: LanguageRepository) {}
    async create(access: IAccessPermission, language: Language): Promise<ILanguageResponse> {
        return await this.languageRepository.create(access, language)
    }
    async update(access: IAccessPermission, id: string, language: Language): Promise<ILanguageResponse> {
        return await this.languageRepository.update(access, id, language)
    }
    async delete(access: IAccessPermission, id: string): Promise<string> {
        return await this.languageRepository.delete(access, id)
    }
    async findAll(access: IAccessPermission, language?: string): Promise<ILanguageResponse[]> {
        return await this.languageRepository.findAll(access, language)
    }
}