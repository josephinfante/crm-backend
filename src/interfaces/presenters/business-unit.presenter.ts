import { IAccessPermission } from "../../domain/auth/access.type";
import { IBusinessUnit } from "../../domain/business-unit/business-unit.type";
import { IDegree } from "../../domain/degree/degree.type";

export interface IBusinessUnitResponse {
    id: string;
    name: string;
    nickname: string;
    degree: {
        id: string,
        name: string,
    },
    current_period: string,
    default_career: string,
    next_period: string,
    code: string;
    hidden: boolean;
    deleted?: boolean;
    createdAt: number;
    updatedAt: number;
}

export function BusinessUnitPresenter(business_unit: IBusinessUnit, access: IAccessPermission, degree?: IDegree): IBusinessUnitResponse {
    return {
        id: business_unit.id,
        name: business_unit.name,
        nickname: business_unit.nickname,
        code: business_unit.code,
        degree: {
            id: degree?.id || "",
            name: degree?.name || "",
        },
        current_period: business_unit.current_period,
        default_career: business_unit.default_career,
        next_period: business_unit.next_period,
        hidden: business_unit.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: business_unit.deleted }),
        createdAt: business_unit.createdAt,
        updatedAt: business_unit.updatedAt,
    }
}