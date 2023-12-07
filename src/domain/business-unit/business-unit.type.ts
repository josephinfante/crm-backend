export interface ICreateBusinessUnit {
    name: string;
    nickname: string;
    code: string;
    current_period: string;
    default_career: string;
    next_period: string;
    degree_id: string | null;
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