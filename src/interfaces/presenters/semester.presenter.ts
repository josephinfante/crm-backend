import { IAccessPermission } from "../../domain/auth/access.type";
import { IBusinessUnit } from "../../domain/business-unit/business-unit.type";
import { ISemester } from "../../domain/semester/semester.type";
export interface ISemesterResponse {
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

export function SemesterPresenter(semester: ISemester, access: IAccessPermission, business_unit?: IBusinessUnit): ISemesterResponse {
    return {
        id: semester.id,
        name: semester.name,
        nickname: semester.nickname,
        code: semester.code,
        business_unit: {
            id: business_unit?.id || "",
            name: business_unit?.name || "",
        },
        hidden: semester.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: semester.deleted }),
        createdAt: semester.createdAt,
        updatedAt: semester.updatedAt,
    }
}