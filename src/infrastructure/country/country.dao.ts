import { Op, WhereOptions } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { CountryPresenter, ICountryResponse } from "../../interfaces/presenters/country.presenter";
import { CountryModel } from "../../shared/models";
import { CountryError } from "../../shared/errors";

export async function FindAllCountries (access: IAccessPermission, country?: string): Promise<ICountryResponse[]> {
    try {
        let nameOrCodeCondition: WhereOptions = {};

        if (country) {
            const countryCondition = {
                [Op.or]: [
                    { name: { [Op.like]: `%${country}%` } },
                    { code: { [Op.like]: `%${country}%` } },
                ],
            };

            nameOrCodeCondition = countryCondition;
        }

        const countries = await CountryModel.findAll({
            where: {
                ...nameOrCodeCondition,
            },
        });

        return countries.map(country => CountryPresenter(country.dataValues, access));
    } catch (error) {
        if (error instanceof Error && error.message) throw new CountryError(error.message);
        else throw new Error("Ha ocurrido un error al buscar los países.");
    }
}