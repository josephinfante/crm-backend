export interface ICreateDegreeSpecification {
    name: string;
    code: string;
    degree_id: string;
}

export interface IUpdateDegreeSpecification extends ICreateDegreeSpecification {
    hidden: boolean;
    deleted: boolean;
}

export interface IDegreeSpecification {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    degree_id: string;
    user_id: string | null;
}