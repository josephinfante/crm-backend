import { IState } from "./state.type";

export class State {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    country_id: string;
    user_id: string | null;
    constructor(state: IState) {
        this.id = state.id;
        this.name = state.name;
        this.code = state.code;
        this.hidden = state.hidden;
        this.deleted = state.deleted;
        this.updatedAt = state.updatedAt;
        this.createdAt = state.createdAt;
        this.country_id = state.country_id;
        this.user_id = state.user_id;
    }
}