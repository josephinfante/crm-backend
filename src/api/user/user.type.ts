export interface UserCreateInterface {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    document_type: string;
    document_number: string;
    phone_number: number;
    role: string;
}

export interface UserUpdateInterface extends UserCreateInterface {
}

export interface UserInterface {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    document_type: string;
    document_number: string;
    phone_number: number;
    createdAt: Date;
    updatedAt: Date;
    role_id: string;
}