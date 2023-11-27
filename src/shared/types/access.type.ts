export interface AccessPermissionInterface {
    user_id: string;
    super_admin: boolean | null;
    role_name: string;
    permission: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
        read_all: boolean;
        read_deleted: boolean;
    }
}