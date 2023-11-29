import { IAccessPermission } from "../../../domain/auth/access.type";
import { Country } from "../../../domain/country/country";
import { CountryRepository } from "../../../domain/country/country.repository";
import { ICountryResponse } from "../../../interfaces/presenters/country.presenter";

export class CountryCrudUseCase {
    constructor(private readonly countryRepository: CountryRepository) {}
    async create(access: IAccessPermission, country: Country): Promise<ICountryResponse> {
        return await this.countryRepository.create(access, country)
    }
    async update(access: IAccessPermission, id: string, country: Country): Promise<ICountryResponse> {
        return await this.countryRepository.update(access, id, country)
    }
    async delete(access: IAccessPermission, id: string): Promise<string> {
        return await this.countryRepository.delete(access, id)
    }
    async findAll(access: IAccessPermission, country?: string): Promise<ICountryResponse[]> {
        return await this.countryRepository.findAll(access, country)
    }
}