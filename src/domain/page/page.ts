import { IPage } from "./page.type";

export class Page {
    id: string;
    name: string;
    internal_url: string | null;
    external_url: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
    constructor(page: IPage) {
        this.id = page.id;
        this.name = page.name;
        this.internal_url = page.internal_url;
        this.external_url = page.external_url;
        this.hidden = page.hidden;
        this.deleted = page.deleted;
        this.updatedAt = page.updatedAt;
        this.createdAt = page.createdAt;
        this.user_id = page.user_id;
    }
}