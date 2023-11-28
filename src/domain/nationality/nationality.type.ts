export interface ICreateNationality {
    name: string;
    code: string;
}

export interface IUpdateNationality extends ICreateNationality {
    hidden: boolean;
}

export interface INationality extends ICreateNationality {
    id: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
}