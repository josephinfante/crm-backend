export interface ICreateContactRelative {
    relationship: string;
    contact_id: string;
    relative_id: string;
}

export interface IContactRelative extends ICreateContactRelative{
    id: string;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
}