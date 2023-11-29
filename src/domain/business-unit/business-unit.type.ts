export interface ICreateBusinessUnit {
    name: string;
    nickname: string;
    code: string;
}

export interface IUpdateBusinessUnit extends ICreateBusinessUnit {
    hidden: boolean;
}

export interface IBusinessUnit extends ICreateBusinessUnit {
    id: string;
    hidden: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
    user_id: string | null;
}