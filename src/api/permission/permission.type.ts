export interface PermissionCreateInterface {
    component_id: string,
    role_id: string,
    create: boolean,
    read: boolean,
    update: boolean,
    delete: boolean,
}

export interface PermissionUpdateInterface extends PermissionCreateInterface {}

export interface PermissionInterface {
    id: string,
    create: boolean,
    read: boolean,
    update: boolean,
    delete: boolean,
    updatedAt: Date,
    createdAt: Date,
    component_id: string,
    role_id: string,
}

export interface GetPermissionByRoleIdInterface {
    id: number;
    component: {
        id: number;
        name: string;
    };
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    updatedAt: Date;
    createdAt: Date;
}