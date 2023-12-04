import { IAccessPermission } from "../../domain/auth/access.type";
import { ICareer } from "../../domain/career/career.type";
import { ISchool } from "../../domain/school/school.types";

export interface ICareerResponse {
    id: string;
    name: string;
    nickname: string;
    code: string;
    school: {
        id: string;
        name: string
    }
    hidden: boolean;
    deleted?: boolean;
    createdAt: number;
    updatedAt: number;
}

export function CareerPresenter(career: ICareer, access: IAccessPermission, school?: ISchool): ICareerResponse {
    return {
        id: career.id,
        name: career.name,
        nickname: career.nickname,
        code: career.code,
        school: {
            id: school?.id || "",
            name: school?.name || "",
        },
        hidden: career.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: career.deleted }),
        createdAt: career.createdAt,
        updatedAt: career.updatedAt,
    }
}