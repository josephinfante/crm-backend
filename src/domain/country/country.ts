import { ICountry } from "./country.type";

export class Country {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
    constructor(country: ICountry) {
        this.id = country.id;
        this.name = country.name;
        this.code = country.code;
        this.hidden = country.hidden;
        this.deleted = country.deleted;
        this.updatedAt = country.updatedAt;
        this.createdAt = country.createdAt;
        this.user_id = country.user_id;
    }
}