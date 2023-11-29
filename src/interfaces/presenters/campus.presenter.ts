import { IAccessPermission } from "../../domain/auth/access.type";
import { ICampus } from "../../domain/campus/campus.type";
export interface ICampusResponse {
    id: string;
    name: string;
    nickname: string;
    code: string;
    hidden: boolean;
    deleted?: boolean;
    createdAt: number;
    updatedAt: number;
}

export function CampusPresenter(campus: ICampus, access: IAccessPermission): ICampusResponse {
    return {
        id: campus.id,
        name: campus.name,
        nickname: campus.nickname,
        code: campus.code,
        hidden: campus.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: campus.deleted }),
        createdAt: campus.createdAt,
        updatedAt: campus.updatedAt,
    }
}