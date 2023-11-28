import { IAccessPermission } from "../../domain/auth/access.type";
import { IDegreeSpecification } from "../../domain/degree-specification/degree-specification.type";

export interface IDegreeSpecificationResponse {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted?: boolean;
    updatedAt: number;
    createdAt: number;
}

export function DegreespecificationPresenter(degree_specification: IDegreeSpecification, access: IAccessPermission): IDegreeSpecificationResponse {
    return {
        id: degree_specification.id,
        name: degree_specification.name,
        code: degree_specification.code,
        hidden: degree_specification.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: degree_specification.deleted }),
        updatedAt: degree_specification.updatedAt,
        createdAt: degree_specification.createdAt,
    };
}