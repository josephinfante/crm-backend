import { IAccessPermission } from "../../domain/auth/access.type";
import { ISemester } from "../../domain/semester/semester.type";
export interface ISemesterResponse {
    id: string;
    name: string;
    nickname: string;
    code: string;
    hidden: boolean;
    deleted?: boolean;
    createdAt: number;
    updatedAt: number;
}

export function SemesterPresenter(semester: ISemester, access: IAccessPermission): ISemesterResponse {
    return {
        id: semester.id,
        name: semester.name,
        nickname: semester.nickname,
        code: semester.code,
        hidden: semester.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: semester.deleted }),
        createdAt: semester.createdAt,
        updatedAt: semester.updatedAt,
    }
}