import { IDistrict } from "./district.type";

export class District {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    city_id: string;
    user_id: string | null;
    constructor(district: IDistrict) {
        this.id = district.id;
        this.name = district.name;
        this.code = district.code;
        this.hidden = district.hidden;
        this.deleted = district.deleted;
        this.updatedAt = district.updatedAt;
        this.createdAt = district.createdAt;
        this.city_id = district.city_id;
        this.user_id = district.user_id;
    }
}