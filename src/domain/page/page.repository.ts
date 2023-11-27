import { IPageResponse } from "../../interfaces/presenters/page.presenter";
import { IAccessPermission } from "../auth/access.type";
import { Page } from "./page";

export interface PageRepository {
    create(access: IAccessPermission, page: Page): Promise<IPageResponse>;
    update(access: IAccessPermission, id: string, page: Page): Promise<IPageResponse>;
    delete(access: IAccessPermission, id: string): Promise<void>;
    findById(access: IAccessPermission, id: string): Promise<IPageResponse>;
    findAll(access: IAccessPermission): Promise<IPageResponse[]>;
}