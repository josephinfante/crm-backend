import { IAccessPermission } from "../../domain/auth/access.type";
import { IBusinessUnit } from "../../domain/business-unit/business-unit.type";
import { IPeriod } from "../../domain/period/period.type";

export interface IPeriodResponse {
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

export function PeriodPresenter(period: IPeriod, access: IAccessPermission, business_unit?: IBusinessUnit): IPeriodResponse {
    return {
        id: period.id,
        name: period.name,
        nickname: period.nickname,
        code: period.code,
        business_unit: {
            id: business_unit?.id || "",
            name: business_unit?.name || "",
        },
        hidden: period.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: period.deleted }),
        createdAt: period.createdAt,
        updatedAt: period.updatedAt,
    }
}