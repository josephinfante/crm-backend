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

export interface LoginInterface {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    document_number: string;
    document_type: string;
    phone_number: string;
    token: string;
    pages: {
        name: string;
        nickname: string;
        internal_url: string;
        external_url: string;
    }[];
    permissions: {
        component: string;
        permissions: {
            create: boolean;
            read: boolean;
            update: boolean;
            delete: boolean;
        };
    }[];
    createdAt: Date;
    updatedAt: Date;
}
