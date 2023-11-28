import { IAccessPermission } from "../../domain/auth/access.type";
import { IDegree } from "../../domain/degree/degree.type";

export interface IDegreeResponse {
    id: string;
    name: string;
    code: string;
    degree_specifications?: IDegreeSpecification[];
    hidden: boolean;
    deleted?: boolean;
    updatedAt: number;
    createdAt: number;
}

export interface IDegreeSpecification {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted?: boolean;
    updatedAt: number;
    createdAt: number;
}

export function DegreePresenter(degree: IDegree, access: IAccessPermission, degree_specification?: IDegreeSpecification[]): IDegreeResponse {
    return {
        id: degree.id,
        name: degree.name,
        code: degree.code,
        ...(degree_specification && { degree_specifications: degree_specification.map(specification => {
            return {
                id: specification.id,
                name: specification.name,
                code: specification.code,
                hidden: specification.hidden,
                ...((access?.super_admin || access?.permission.read_deleted) && { deleted: specification.deleted }),
                updatedAt: specification.updatedAt,
                createdAt: specification.createdAt
            }
        })}),
        hidden: degree.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: degree.deleted }),
        updatedAt: degree.updatedAt,
        createdAt: degree.createdAt
    };
}