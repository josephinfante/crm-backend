import { INationality } from "./nationality.type";

export class Nationality {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
    constructor(nationality: INationality) {
        this.id = nationality.id;
        this.name = nationality.name;
        this.code = nationality.code;
        this.hidden = nationality.hidden;
        this.deleted = nationality.deleted;
        this.updatedAt = nationality.updatedAt;
        this.createdAt = nationality.createdAt;
        this.user_id = nationality.user_id;
    }
}