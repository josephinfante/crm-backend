export interface ICreateCollege {
    name: string;
    code: string;
    type: string;
    class: string;
    level: string;
    board: string;
    is_competitor: boolean;
    priority: number;
}

export interface IUpdateCollege extends ICreateCollege {
    hidden: boolean;
}

export interface ICollege extends ICreateCollege {
    id: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
}