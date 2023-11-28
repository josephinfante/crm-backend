import { IAccessPermission } from "../../../domain/auth/access.type";
import { Degree } from "../../../domain/degree/degree";
import { DegreeRepository } from "../../../domain/degree/degree.repository";
import { IDegreeResponse } from "../../../interfaces/presenters/degree.presenter";

export class DegreeCrudUseCase {
    constructor(private readonly degreeRepository: DegreeRepository) {}
    async create(access: IAccessPermission, degree: Degree): Promise<IDegreeResponse> {
        return this.degreeRepository.create(access, degree);
    }
    async update(access: IAccessPermission, id: string, degree: Degree): Promise<IDegreeResponse> {
        return this.degreeRepository.update(access, id, degree);
    }
    async delete(access: IAccessPermission, id: string): Promise<string> {
        return this.degreeRepository.delete(access, id);
    }
    async findById(access: IAccessPermission, id: string): Promise<IDegreeResponse> {
        return this.degreeRepository.findById(access, id);
    }
    async findAll(access: IAccessPermission, degree?: string): Promise<IDegreeResponse[]> {
        return this.degreeRepository.findAll(access, degree);
    }
}