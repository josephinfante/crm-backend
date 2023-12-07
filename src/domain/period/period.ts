import { IPeriod } from "./period.type";

export class Period {
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
    constructor(period: IPeriod) {
        this.id = period.id;
        this.name = period.name;
        this.nickname = period.nickname;
        this.code = period.code;
        this.hidden = period.hidden;
        this.deleted = period.deleted;
        this.updatedAt = period.updatedAt;
        this.createdAt = period.createdAt;
        this.business_unit_id = period.business_unit_id;
        this.user_id = period.user_id;
    }
}