import { IAccessPermission } from "../../domain/auth/access.type";
import { DegreeSpecification } from "../../domain/degree-specification/degree-specification";
import { DegreeSpecificationRepository } from "../../domain/degree-specification/degree-specification.repository";
import { IDegreeSpecificationResponse } from "../../interfaces/presenters/degree-specification.presenter";
import degreeSpecificationDao from "./degree-specification.dao";

export class DegreeSpecificationRepositoryImpl implements DegreeSpecificationRepository {
    create(access: IAccessPermission, degree_specification: DegreeSpecification): Promise<IDegreeSpecificationResponse> {
        return degreeSpecificationDao.create(access, degree_specification);
    }
    update(access: IAccessPermission, id: string, degree_specification: DegreeSpecification): Promise<IDegreeSpecificationResponse> {
        return degreeSpecificationDao.update(access, id, degree_specification);
    }
    delete(access: IAccessPermission, id: string): Promise<string> {
        return degreeSpecificationDao.delete(access, id);
    }
    findByDegreeId(access: IAccessPermission, degree_id: string): Promise<IDegreeSpecificationResponse[]> {
        return degreeSpecificationDao.findByDegreeId(access, degree_id);
    }
}