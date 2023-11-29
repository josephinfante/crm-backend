import { IBusinessUnit } from "./business-unit.type";

export class BusinessUnit {
    id: string;
    name: string;
    nickname: string;
    code: string;
    hidden: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
    user_id: string | null;
    constructor(business_unit: IBusinessUnit) {
        this.id = business_unit.id;
        this.name = business_unit.name;
        this.nickname = business_unit.nickname;
        this.code = business_unit.code;
        this.hidden = business_unit.hidden;
        this.deleted = business_unit.deleted;
        this.createdAt = business_unit.createdAt;
        this.updatedAt = business_unit.updatedAt;
        this.user_id = business_unit.user_id;
    }
}