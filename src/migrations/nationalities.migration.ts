import { nationalities_data } from "../shared/data";
import { NationalityError } from "../shared/errors";
import { NationalityModel } from "../shared/models";
import { UniqueID } from "../shared/utils";

async function NationalityMigration() {
    try {
        const nationalities = nationalities_data.map(nationality => ({
            id: UniqueID.generate(),
            name: nationality.name,
            code: nationality.code,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }));
        await NationalityModel.bulkCreate(nationalities).catch(_error => { throw new NationalityError('Ha ocurrido un error al tratar de insertar las nacionalidades.') });
    } catch (error) {
        if (error instanceof Error && error.message) throw new NationalityError(error.message);
        else throw new Error('Ha ocurrido un error al tratar de insertar las nacionalidades ejecutando la migración.');
    }
}

NationalityMigration();