import { IDegreeSpecificationResponse } from "../../interfaces/presenters/degree-specification.presenter";
import { IAccessPermission } from "../auth/access.type";
import { DegreeSpecification } from "./degree-specification";

export interface DegreeSpecificationRepository {
    create(access: IAccessPermission, degree_specification: DegreeSpecification): Promise<IDegreeSpecificationResponse>;
    update(access: IAccessPermission, id: string , degree_specification: DegreeSpecification): Promise<IDegreeSpecificationResponse>;
    delete(access: IAccessPermission, id: string): Promise<string>;
    findByDegreeId(access: IAccessPermission, degree_id: string): Promise<IDegreeSpecificationResponse[]>;
}