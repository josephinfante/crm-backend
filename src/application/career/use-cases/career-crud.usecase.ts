import { IAccessPermission } from "../../../domain/auth/access.type";
import { Career } from "../../../domain/career/career";
import { CareerRepository } from "../../../domain/career/career.repository";
import { ICareerResponse } from "../../../interfaces/presenters/career.presenter";

export class CareerCrudUseCase {
    constructor(private readonly careerRepository: CareerRepository) {}
    async create(access: IAccessPermission, career: Career): Promise<ICareerResponse> {
        return await this.careerRepository.create(access, career);
    }
    async update(access: IAccessPermission, id: string, career: Career): Promise<ICareerResponse> {
        return await this.careerRepository.update(access, id, career);
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        return await this.careerRepository.delete(access, id);
    }
    async findBySchoolId(access: IAccessPermission, school_id: string): Promise<ICareerResponse[]> {
        return await this.careerRepository.findBySchoolId(access, school_id);
    }
    async findAll(access: IAccessPermission): Promise<ICareerResponse[]> {
        return await this.careerRepository.findAll(access);
    }
}