import { IAccessPermission } from "../../domain/auth/access.type";
import { ICountry } from "../../domain/country/country.type";

export interface ICountryResponse {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted?: boolean;
    updatedAt: number;
    createdAt: number;
}

export function CountryPresenter(country: ICountry, access: IAccessPermission): ICountryResponse {
    return {
        id: country.id,
        name: country.name,
        code: country.code,
        hidden: country.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: country.deleted }),
        updatedAt: country.updatedAt,
        createdAt: country.createdAt,
    }
}