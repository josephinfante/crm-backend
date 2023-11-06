export interface PermissionCreateInterface {
    component: string,
    role: string,
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