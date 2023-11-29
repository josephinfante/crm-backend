import { ISemester } from "./semester.type";

export class Semester {
    id: string;
    name: string;
    nickname: string;
    code: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    business_unit_id: string;
    user_id: string | null;
    constructor(semester: ISemester) {
        this.id = semester.id;
        this.name = semester.name;
        this.nickname = semester.nickname;
        this.code = semester.code;
        this.hidden = semester.hidden;
        this.deleted = semester.deleted;
        this.updatedAt = semester.updatedAt;
        this.createdAt = semester.createdAt;
        this.business_unit_id = semester.business_unit_id;
        this.user_id = semester.user_id;
    }
}