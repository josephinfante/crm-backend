import { IPermission } from "./permission.type";

export class Permission {
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
    constructor(permission: IPermission) {
        this.id = permission.id;
        this.create = permission.create;
        this.read = permission.read;
        this.update = permission.update;
        this.delete = permission.delete;
        this.read_all = permission.read_all;
        this.read_deleted = permission.read_deleted;
        this.createdAt = permission.createdAt;
        this.updatedAt = permission.updatedAt;
        this.component_id = permission.component_id;
        this.role_id = permission.role_id;
        this.user_id = permission.user_id;
    }
}