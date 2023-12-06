import { IAccessPermission } from "../../domain/auth/access.type";
import { IBusinessUnit } from "../../domain/business-unit/business-unit.type";
import { ICampus } from "../../domain/campus/campus.type";
export interface ICampusResponse {
    id: string;
    name: string;
    nickname: string;
    code: string;
    business_unit: {
        id: string;
        name: string;
    }
    hidden: boolean;
    deleted?: boolean;
    createdAt: number;
    updatedAt: number;
}

export function CampusPresenter(campus: ICampus, access: IAccessPermission, business_unit: IBusinessUnit): ICampusResponse {
    return {
        id: campus.id,
        name: campus.name,
        nickname: campus.nickname,
        code: campus.code,
        business_unit: {
            id: business_unit.id,
            name: business_unit.name,
        },
        hidden: campus.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: campus.deleted }),
        createdAt: campus.createdAt,
        updatedAt: campus.updatedAt,
    }
}