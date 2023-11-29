import { ICareer } from "./career.type";

export class Career {
    id: string;
    name: string;
    nickname: string;
    code: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    school_id: string;
    user_id: string | null;
    constructor(career: ICareer) {
        this.id = career.id;
        this.name = career.name;
        this.nickname = career.nickname;
        this.code = career.code;
        this.hidden = career.hidden;
        this.deleted = career.deleted;
        this.updatedAt = career.updatedAt;
        this.createdAt = career.createdAt;
        this.school_id = career.school_id;
        this.user_id = career.user_id;
    }
}