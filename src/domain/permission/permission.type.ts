export interface ICreatePermission {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    read_all: boolean;
    read_deleted: boolean;
}

export interface IUpdatePermission extends ICreatePermission {}

export interface IPermission {
    id: string;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    read_all: boolean;
    read_deleted: boolean;
    createdAt: number;
    updatedAt: number;
    component_id: string;
    role_id: string;
    user_id: string | null;
}