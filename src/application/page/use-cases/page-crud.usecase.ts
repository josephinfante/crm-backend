import { IAccessPermission } from "../../../domain/auth/access.type";
import { Page } from "../../../domain/page/page";
import { PageRepository } from "../../../domain/page/page.repository";
import { IPageResponse } from "../../../interfaces/presenters/page.presenter";

export class PageCrudUseCase {
    constructor(private readonly pageRepository: PageRepository) {}
    async create(access: IAccessPermission, page: Page): Promise<IPageResponse> {
        return this.pageRepository.create(access, page);
    }
    async update(access: IAccessPermission, id: string, page: Page): Promise<IPageResponse> {
        return this.pageRepository.update(access, id, page);
    }
    async delete(access: IAccessPermission, id: string): Promise<void> {
        return this.pageRepository.delete(access, id);
    }
    async findById(access: IAccessPermission, id: string): Promise<IPageResponse> {
        return this.pageRepository.findById(access, id);
    }
    async findAll(access: IAccessPermission): Promise<IPageResponse[]> {
        return this.pageRepository.findAll(access);
    }
}