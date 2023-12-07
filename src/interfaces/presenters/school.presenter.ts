import { IAccessPermission } from "../../domain/auth/access.type";
import { IBusinessUnit } from "../../domain/business-unit/business-unit.type";
import { ISchool } from "../../domain/school/school.types";

export interface ISchoolResponse {
    id: string;
    name: string;
    nickname: string;
    code: string;
    business_unit: {
        id: string;
        name: string
    }
    hidden: boolean;
    deleted?: boolean;
    createdAt: number;
    updatedAt: number;
}

export function SchoolPresenter(school: ISchool, access: IAccessPermission, business_unit?: IBusinessUnit): ISchoolResponse {
    return {
        id: school.id,
        name: school.name,
        nickname: school.nickname,
        code: school.code,
        business_unit: {
            id: business_unit?.id || "",
            name: business_unit?.name || "",
        },
        hidden: school.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: school.deleted }),
        createdAt: school.createdAt,
        updatedAt: school.updatedAt,
    }
}