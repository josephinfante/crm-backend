import { ICountryResponse } from "../../interfaces/presenters/country.presenter";
import { IAccessPermission } from "../auth/access.type";
import { Country } from "./country";

export interface CountryRepository {
    create(access: IAccessPermission, country: Country): Promise<ICountryResponse>;
    update(access: IAccessPermission, id: string, country: Country): Promise<ICountryResponse>;
    delete(access: IAccessPermission, id: string): Promise<string>;
    findAll(access: IAccessPermission, country?: string): Promise<ICountryResponse[]>;
}