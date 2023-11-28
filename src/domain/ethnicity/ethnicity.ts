import { IEthnicity } from "./ethnicity.type";

export class Ethnicity {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
    constructor(ethnicity: IEthnicity) {
        this.id = ethnicity.id;
        this.name = ethnicity.name;
        this.code = ethnicity.code;
        this.hidden = ethnicity.hidden;
        this.deleted = ethnicity.deleted;
        this.updatedAt = ethnicity.updatedAt;
        this.createdAt = ethnicity.createdAt;
        this.user_id = ethnicity.user_id;
    }
}