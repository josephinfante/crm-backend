import { IAccessPermission } from "../../domain/auth/access.type";
import { ISchool } from "../../domain/school/school.types";

export interface ISchoolResponse {
    id: string;
    name: string;
    nickname: string;
    code: string;
    hidden: boolean;
    deleted?: boolean;
    createdAt: number;
    updatedAt: number;
}

export function SchoolPresenter(school: ISchool, access: IAccessPermission): ISchoolResponse {
    return {
        id: school.id,
        name: school.name,
        nickname: school.nickname,
        code: school.code,
        hidden: school.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: school.deleted }),
        createdAt: school.createdAt,
        updatedAt: school.updatedAt,
    }
}