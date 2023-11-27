import { IUser } from "./user.type";

export class User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    document_type: string;
    document_number: string;
    phone_number: string;
    super_admin?: boolean | null;
    hidden: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
    role_id: string;
    user_id: string | null;
    constructor(user: IUser) {
        this.id = user.id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.password = user.password;
        this.document_type = user.document_type;
        this.document_number = user.document_number;
        this.phone_number = user.phone_number;
        this.super_admin = user.super_admin;
        this.hidden = user.hidden;
        this.deleted = user.deleted;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.role_id = user.role_id;
        this.user_id = user.user_id;
    }
}