import { IAccessPermission } from "../../domain/auth/access.type";
import { INationality } from "../../domain/nationality/nationality.type";

export interface INationalityResponse {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted?: boolean;
    updatedAt: number;
    createdAt: number;
}

export function NationalityPresenter(nationality: INationality, access: IAccessPermission): INationalityResponse {
    return {
        id: nationality.id,
        name: nationality.name,
        code: nationality.code,
        hidden: nationality.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: nationality.deleted }),
        updatedAt: nationality.updatedAt,
        createdAt: nationality.createdAt
    }
}