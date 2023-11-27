import { IAccessPermission } from "../../domain/auth/access.type";
import { IUser } from "../../domain/user/user.type";

export interface IUserResponse {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    document_type: string;
    document_number: string;
    phone_number: string;
    hidden: boolean;
    deleted?: boolean;
    role: {
        id: string;
        name: string;
    };
    createdAt: number;
    updatedAt: number;
}

export function UserPresenter(user: IUser, role?: { id: string; name: string; }, access?: IAccessPermission): IUserResponse {
    return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        document_type: user.document_type,
        document_number: user.document_number,
        phone_number: user.phone_number,
        hidden: user.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: user.deleted }),
        role: {
            id: role?.id || '',
            name: role?.name || '',
        },
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }
    
}