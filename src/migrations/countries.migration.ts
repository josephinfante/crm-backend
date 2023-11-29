import { countries_data } from "../shared/data";
import { CountryError } from "../shared/errors";
import { CountryModel } from "../shared/models";
import { UniqueID } from "../shared/utils";

async function CountryMigration() {
    try {
        const countries = countries_data.map(country => ({
            id: UniqueID.generate(),
            name: country.name,
            code: country.code,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }));
        await CountryModel.bulkCreate(countries).catch(_error => { throw new CountryError('Ha ocurrido un error al tratar de insertar los países.') });
    } catch (error) {
        if (error instanceof Error && error.message) throw new CountryError(error.message);
        else throw new Error('Ha ocurrido un error al tratar de insertar los países ejecutando la migración.');
    }
}

CountryMigration();