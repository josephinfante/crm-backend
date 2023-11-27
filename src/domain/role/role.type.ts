export interface ICreateRole {
    name: string;
    pages: {
        id: string;
        name: string;
    }[];
    components: {
        id: string;
        permissions: {
            id?: string;
            create: boolean;
            read: boolean;
            update: boolean;
            delete: boolean;
            read_all: boolean;
            read_deleted: boolean;
        };
    }[];
}

export interface IUpdateRole extends ICreateRole {}

export interface IRole extends ICreateRole {
    id: string;
    hidden: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
    user_id: string | null;
}