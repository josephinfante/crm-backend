import { IDegree } from "./degree.type";

export class Degree {
    public id: string;
    public name: string;
    public code: string;
    public hidden: boolean;
    public deleted: boolean;
    public updatedAt: number;
    public createdAt: number;
    public user_id: string | null;
    constructor(degree: IDegree) {
        this.id = degree.id;
        this.name = degree.name;
        this.code = degree.code;
        this.hidden = degree.hidden;
        this.deleted = degree.deleted;
        this.updatedAt = degree.updatedAt;
        this.createdAt = degree.createdAt;
        this.user_id = degree.user_id;
    }
}