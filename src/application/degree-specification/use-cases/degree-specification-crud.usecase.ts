import { IAccessPermission } from "../../../domain/auth/access.type";
import { DegreeSpecification } from "../../../domain/degree-specification/degree-specification";
import { DegreeSpecificationRepository } from "../../../domain/degree-specification/degree-specification.repository";
import { IDegreeSpecificationResponse } from "../../../interfaces/presenters/degree-specification.presenter";

export class DegreeSpecificationCrudUseCase {
    constructor(private readonly degreeSpecificationRepository: DegreeSpecificationRepository) {
        this.degreeSpecificationRepository = degreeSpecificationRepository;
    }
    async create(access: IAccessPermission, degree_specification: DegreeSpecification): Promise<IDegreeSpecificationResponse> {
        return this.degreeSpecificationRepository.create(access, degree_specification);
    }
    async update(access: IAccessPermission, id: string , degree_specification: DegreeSpecification): Promise<IDegreeSpecificationResponse> {
        return this.degreeSpecificationRepository.update(access, id, degree_specification);
    }
    async delete(access: IAccessPermission, id: string): Promise<string> {
        return this.degreeSpecificationRepository.delete(access, id);
    }
    async findByDegreeId(access: IAccessPermission, degree_id: string): Promise<IDegreeSpecificationResponse[]> {
        return this.degreeSpecificationRepository.findByDegreeId(access, degree_id);
    }
}