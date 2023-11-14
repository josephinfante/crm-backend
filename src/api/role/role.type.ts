export interface CreateRoleInterface {
    name: string;
    pages: {
        id: string;
    }[];
    components: {
        id: string;
        permissions: {
            create: boolean;
            read: boolean;
            update: boolean;
            delete: boolean;
        };
    }[];
}

export interface UpdateRoleInterface extends CreateRoleInterface {}

export interface RoleInterface extends CreateRoleInterface {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}