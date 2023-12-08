export interface IAccessPermission {
    user_id: string;
    user_name: string;
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