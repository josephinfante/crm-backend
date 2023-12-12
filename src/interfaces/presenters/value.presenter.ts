import { IAccessPermission } from "../../domain/auth/access.type";
import { IValue } from "../../domain/value/value.type";

export interface IValueResponse {
    id: string;
    select_name: string;
    key: string;
    value: string;
    deleted?: boolean;
    createdAt: number;
    updatedAt: number;
}

export function ValuePresenter(value: IValue, access: IAccessPermission): IValueResponse {
    return {
        id: value.id,
        select_name: value.select_name,
        key: value.key,
        value: value.value,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: value.deleted }),
        createdAt: value.createdAt,
        updatedAt: value.updatedAt,
    }
}