import { IAccessPermission } from "../../domain/auth/access.type";
import { IEthnicity } from "../../domain/ethnicity/ethnicity.type";

export interface IEthnicityResponse {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted?: boolean;
    updatedAt: number;
    createdAt: number;
}

export function EthnicityPresenter(ethnicity: IEthnicity, access: IAccessPermission): IEthnicityResponse {
    return {
        id: ethnicity.id,
        name: ethnicity.name,
        code: ethnicity.code,
        hidden: ethnicity.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: ethnicity.deleted }),
        updatedAt: ethnicity.updatedAt,
        createdAt: ethnicity.createdAt
    }
}