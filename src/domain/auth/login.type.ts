export interface ILogin {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    document_number: string;
    document_type: string;
    phone_number: string;
    token: string;
    pages: {
        id: string;
        name: string;
        external_url?: string;
    }[];
    permissions: {
        component: {
            id: string;
            name: string;
        };
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
