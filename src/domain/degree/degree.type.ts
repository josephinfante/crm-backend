export interface ICreateDegree {
    name: string;
    code: string;
}

export interface IUpdateDegree extends ICreateDegree {
    hidden: boolean;
    deleted: boolean;
}

export interface IDegree {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
}