export interface ICreatePage {
    name: string;
    external_url: string;
}

export interface IUpdatePage extends ICreatePage {}

export interface IPage {
    id: string;
    name: string;
    internal_url: string | null;
    external_url: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
}