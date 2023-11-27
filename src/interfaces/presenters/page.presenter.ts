import { IAccessPermission } from "../../domain/auth/access.type";
import { IPage } from "../../domain/page/page.type";

export interface IPageResponse {
    id: string;
    name: string;
    internal_url: string | null;
    external_url: string;
    hidden: boolean;
    deleted?: boolean;
    updatedAt: number;
    createdAt: number;
}

export function PagePresenter(page: IPage, access?: IAccessPermission): IPageResponse {
    return {
        id: page.id,
        name: page.name,
        internal_url: page.internal_url,
        external_url: page.external_url,
        hidden: page.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: page.deleted }),
        updatedAt: page.updatedAt,
        createdAt: page.createdAt
    };
}