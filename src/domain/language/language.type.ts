export interface ICreateLanguage {
    name: string;
    code: string;
}

export interface IUpdateLanguage extends ICreateLanguage {
    hidden: boolean;
}

export interface ILanguage {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
}