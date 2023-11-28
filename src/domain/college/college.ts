import { ICollege } from "./college.type";

export class College {
    id: string;
    name: string;
    code: string;
    type: string;
    class: string;
    level: string;
    board: string;
    is_competitor: boolean;
    priority: number;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
    constructor(college: ICollege) {
        this.id = college.id;
        this.name = college.name;
        this.code = college.code;
        this.type = college.type;
        this.class = college.class;
        this.level = college.level;
        this.board = college.board;
        this.is_competitor = college.is_competitor;
        this.priority = college.priority;
        this.hidden = college.hidden;
        this.deleted = college.deleted;
        this.updatedAt = college.updatedAt;
        this.createdAt = college.createdAt;
        this.user_id = college.user_id;
    }
}