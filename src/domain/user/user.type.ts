export interface ICreateUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    document_type: string;
    document_number: string;
    phone_number: string;
    role_id: string;
}

export interface IUpdateUser extends ICreateUser {
}

export interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    document_type: string;
    document_number: string;
    phone_number: string;
    super_admin?: boolean | null;
    hidden: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
    role_id: string;
    user_id: string | null;
}
