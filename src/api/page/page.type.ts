export interface CreatePageInterface {
    name: string;
    role: string;
}

export interface UpdatePageInterface extends CreatePageInterface {}

export interface PageInterface {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    role_id: string;
}