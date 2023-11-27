import { IAccessPermission } from "../../domain/auth/access.type";
import { Page } from "../../domain/page/page";
import { PageRepository } from "../../domain/page/page.repository";
import { IPageResponse } from "../../interfaces/presenters/page.presenter";
import pageDao from "./page.dao";

export class PageRepositoryImpl implements PageRepository {
    create(access: IAccessPermission, page: Page): Promise<IPageResponse> {
        return pageDao.create(access, page);
    }
    update(access: IAccessPermission, id: string, page: Page): Promise<IPageResponse> {
        return pageDao.update(access, id, page);
    }
    delete(access: IAccessPermission, id: string): Promise<void> {
        return pageDao.delete(access, id);
    }
    findById(access: IAccessPermission, id: string): Promise<IPageResponse> {
        return pageDao.findById(access, id);
    }
    findAll(access: IAccessPermission): Promise<IPageResponse[]> {
        return pageDao.findAll(access);
    }
}