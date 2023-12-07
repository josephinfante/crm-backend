import { IAccessPermission } from "../../../domain/auth/access.type";
import { School } from "../../../domain/school/school";
import { SchoolRepository } from "../../../domain/school/school.repository";
import { ISchoolResponse } from "../../../interfaces/presenters/school.presenter";

export class SchoolCrudUseCase {
    constructor(private readonly schoolRepository: SchoolRepository) {}
    async create(access: IAccessPermission, school: School): Promise<ISchoolResponse> {
        return await this.schoolRepository.create(access, school);
    }
    async update(access: IAccessPermission, id: string, school: School): Promise<ISchoolResponse> {
        return await this.schoolRepository.update(access, id, school);
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        return await this.schoolRepository.delete(access, id);
    }
    async findByBusinessUnitId(access: IAccessPermission, business_unit_id: string): Promise<ISchoolResponse[]> {
        return await this.schoolRepository.findByBusinessUnitId(access, business_unit_id);
    }
    async findAll(access: IAccessPermission): Promise<ISchoolResponse[]> {
        return await this.schoolRepository.findAll(access);
    }
}