import { IMenu } from "./menu.type";

export class Menu {
    id: string;
    updatedAt: number;
    createdAt: number;
    role_id: string;
    page_id: string;
    user_id: string;
    constructor(menu: IMenu) {
        this.id = menu.id;
        this.updatedAt = menu.updatedAt;
        this.createdAt = menu.createdAt;
        this.role_id = menu.role_id;
        this.page_id = menu.page_id;
        this.user_id = menu.user_id;
    }
}