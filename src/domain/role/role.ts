import { IRole } from "./role.type";

export class Role {
    id: string;
    name: string;
    hidden: boolean;
    deleted: boolean;
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
    createdAt: number;
    updatedAt: number;
    user_id: string | null;
    constructor(role: IRole) {
        this.id = role.id;
        this.name = role.name;
        this.hidden = role.hidden;
        this.deleted = role.deleted;
        this.pages = role.pages;
        this.components = role.components;
        this.createdAt = role.createdAt;
        this.updatedAt = role.updatedAt;
        this.user_id = role.user_id;
    }
}