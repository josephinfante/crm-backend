import { IAccessPermission } from "../../domain/auth/access.type";
import { Country } from "../../domain/country/country";
import { CountryRepository } from "../../domain/country/country.repository";
import { ICountryResponse } from "../../interfaces/presenters/country.presenter";
import countryDao from "./country.dao";

export class CountryRepositoryImpl implements CountryRepository {
    create(access: IAccessPermission, country: Country): Promise<ICountryResponse> {
        return countryDao.create(access, country)
    }
    update(access: IAccessPermission, id: string, country: Country): Promise<ICountryResponse> {
        return countryDao.update(access, id, country)
    }
    delete(access: IAccessPermission, id: string): Promise<string> {
        return countryDao.delete(access, id)
    }
    findAll(access: IAccessPermission, country?: string): Promise<ICountryResponse[]> {
        return countryDao.findAll(access, country)
    }
}