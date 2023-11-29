import { IAccessPermission } from "../../domain/auth/access.type";
import { IBusinessUnit } from "../../domain/business-unit/business-unit.type";

export interface IBusinessUnitResponse {
    id: string;
    name: string;
    nickname: string;
    code: string;
    hidden: boolean;
    deleted?: boolean;
    createdAt: number;
    updatedAt: number;
}

export function BusinessUnitPresenter(business_unit: IBusinessUnit, access: IAccessPermission): IBusinessUnitResponse {
    return {
        id: business_unit.id,
        name: business_unit.name,
        nickname: business_unit.nickname,
        code: business_unit.code,
        hidden: business_unit.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: business_unit.deleted }),
        createdAt: business_unit.createdAt,
        updatedAt: business_unit.updatedAt,
    }
}