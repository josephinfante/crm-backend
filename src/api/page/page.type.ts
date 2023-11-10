export interface CreatePageInterface {
    name: string;
    roles: string[];
}

export interface UpdatePageInterface extends CreatePageInterface {}

export interface PageInterface {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    role_id: string;
}