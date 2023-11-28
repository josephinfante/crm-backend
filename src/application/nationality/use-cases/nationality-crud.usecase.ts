import { IAccessPermission } from "../../../domain/auth/access.type";
import { Nationality } from "../../../domain/nationality/nationality";
import { NationalityRepository } from "../../../domain/nationality/nationality.repository";
import { INationalityResponse } from "../../../interfaces/presenters/nationality.presenter";

export class NationalityCrudUseCase {
    constructor(private readonly nationalityRepository: NationalityRepository) {}
    async create(access: IAccessPermission, nationality: Nationality): Promise<INationalityResponse> {
        return this.nationalityRepository.create(access, nationality);
    }
    async update(access: IAccessPermission, id: string, nationality: Nationality): Promise<INationalityResponse> {
        return this.nationalityRepository.update(access, id, nationality);
    }
    async delete(access: IAccessPermission, id: string): Promise<string> {
        return this.nationalityRepository.delete(access, id);
    }
    async findAll(access: IAccessPermission, nationality?: string): Promise<INationalityResponse[]> {
        return this.nationalityRepository.findAll(access, nationality);
    }
}