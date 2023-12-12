import { IValue } from "./value.type";

export class Value {
    id: string;
    select_name: string;
    key: string;
    value: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
    constructor(value: IValue) {
        this.id = value.id;
        this.select_name = value.select_name;
        this.key = value.key;
        this.value = value.value;
        this.hidden = value.hidden;
        this.deleted = value.deleted;
        this.updatedAt = value.updatedAt;
        this.createdAt = value.createdAt;
        this.user_id = value.user_id;
    }
}