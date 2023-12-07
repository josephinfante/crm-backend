import { IBusinessUnit } from "./business-unit.type";

export class BusinessUnit {
    id: string;
    name: string;
    nickname: string;
    code: string;
    current_period: string;
    default_career: string;
    next_period: string;
    hidden: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
    degree_id: string | null;
    user_id: string | null;
    constructor(business_unit: IBusinessUnit) {
        this.id = business_unit.id;
        this.name = business_unit.name;
        this.nickname = business_unit.nickname;
        this.code = business_unit.code;
        this.current_period = business_unit.current_period;
        this.default_career = business_unit.default_career;
        this.next_period = business_unit.next_period;
        this.hidden = business_unit.hidden;
        this.deleted = business_unit.deleted;
        this.createdAt = business_unit.createdAt;
        this.updatedAt = business_unit.updatedAt;
        this.degree_id = business_unit.degree_id;
        this.user_id = business_unit.user_id;
    }
}