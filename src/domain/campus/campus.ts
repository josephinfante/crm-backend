import { ICampus } from "./campus.type";

export class Campus {
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
    constructor(campus: ICampus) {
        this.id = campus.id;
        this.name = campus.name;
        this.nickname = campus.nickname;
        this.code = campus.code;
        this.hidden = campus.hidden;
        this.deleted = campus.deleted;
        this.updatedAt = campus.updatedAt;
        this.createdAt = campus.createdAt;
        this.business_unit_id = campus.business_unit_id;
        this.user_id = campus.user_id;
    }
}