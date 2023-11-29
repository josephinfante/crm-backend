import { ISchool } from "./school.types";

export class School {
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
    constructor(school: ISchool) {
        this.id = school.id;
        this.name = school.name;
        this.nickname = school.nickname;
        this.code = school.code;
        this.hidden = school.hidden;
        this.deleted = school.deleted;
        this.updatedAt = school.updatedAt;
        this.createdAt = school.createdAt;
        this.business_unit_id = school.business_unit_id;
        this.user_id = school.user_id;
    }
}