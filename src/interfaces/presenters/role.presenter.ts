import { IAccessPermission } from "../../domain/auth/access.type";

interface IRole {
    id: string;
    name: string;
    hidden: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
}

export interface IRoleResponse {
    id: string;
    name: string;
    pages: IRolePage[];
    components:IRoleComponent[];
    hidden: boolean;
    deleted?: boolean;
    createdAt: number;
    updatedAt: number;
}

export interface IRolePage {
    id: string;
    name: string;
    external_url?: string;
    updatedAt: number;
    createdAt: number;
}

export interface IRoleComponent {
    id: string;
    name: string;
    permissions: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
        read_all: boolean;
        read_deleted: boolean;
    }
    updatedAt: number;
    createdAt: number;
}

export function RolePresenter(role: IRole, pages: IRolePage[], component: IRoleComponent[], access?: IAccessPermission): IRoleResponse {
    return {
        id: role.id,
        name: role.name,
        pages: pages,
        components: component.map((component) => {
            return {
                id: component.id,
                name: component.name,
                permissions: {
                    create: component.permissions.create,
                    read: component.permissions.read,
                    update: component.permissions.update,
                    delete: component.permissions.delete,
                    read_all: component.permissions.read_all,
                    read_deleted: component.permissions.read_deleted,
                },
                updatedAt: component.updatedAt,
                createdAt: component.createdAt
            }
        }),
        hidden: role.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: role.deleted }),
        createdAt: role.createdAt,
        updatedAt: role.updatedAt
    }
}