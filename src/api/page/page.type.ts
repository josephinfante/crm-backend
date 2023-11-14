export interface CreatePageInterface {
    name: string;
    nickname: string;
    internal_url: string;
    external_url: string;
    roles: string[];
}

export interface UpdatePageInterface extends CreatePageInterface {
}

export interface PageInterface {
    id: string;
    name: string;
    nickname: string;
    internal_url: string;
    external_url: string;
    role_ids: string;
    createdAt: Date;
    updatedAt: Date;
}