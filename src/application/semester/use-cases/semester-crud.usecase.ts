import { IAccessPermission } from "../../../domain/auth/access.type";
import { Semester } from "../../../domain/semester/semester";
import { SemesterRepository } from "../../../domain/semester/semester.repository";
import { ISemesterResponse } from "../../../interfaces/presenters/semester.presenter";

export class SemesterCrudUseCase {
    constructor(private readonly semesterRepository: SemesterRepository) { }
    async create(access: IAccessPermission, semester: Semester): Promise<ISemesterResponse> {
        return this.semesterRepository.create(access, semester);
    }
    async update(access: IAccessPermission, id: string, semester: Semester): Promise<ISemesterResponse> {
        return this.semesterRepository.update(access, id, semester);
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        return this.semesterRepository.delete(access, id);
    }
    async findByBusinessUnitId(access: IAccessPermission, business_unit_id: string): Promise<ISemesterResponse[]> {
        return this.semesterRepository.findByBusinessUnitId(access, business_unit_id);
    }
    async findAll(access: IAccessPermission): Promise<ISemesterResponse[]> {
        return this.semesterRepository.findAll(access);
    }
}