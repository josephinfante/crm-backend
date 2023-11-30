import { ICity } from "./city.type";

export class City {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    state_id: string;
    user_id: string | null;
    constructor(city: ICity) {
        this.id = city.id;
        this.name = city.name;
        this.code = city.code;
        this.hidden = city.hidden;
        this.deleted = city.deleted;
        this.updatedAt = city.updatedAt;
        this.createdAt = city.createdAt;
        this.state_id = city.state_id;
        this.user_id = city.user_id;
    }
}