import { peru_states_data } from "../shared/data";
import { StateError } from "../shared/errors";
import { CountryModel, StateModel } from "../shared/models";
import { UniqueID } from "../shared/utils";

async function PeruStatesMigration() {
    try {
        const peru_id = await CountryModel.findOne({ where: { name: 'Perú', code: 'PE' } }).then(country => country?.dataValues.id);
        const states = peru_states_data.map(state => ({
            id: UniqueID.generate(),
            name: state.name,
            code: state.code,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            country_id: peru_id,
        }));
        await StateModel.bulkCreate(states).catch(_error => { throw new StateError('Ha ocurrido un error al tratar de insertar los departamentos del Perú.') });
    } catch (error) {
        if (error instanceof Error && error.message) throw new StateError(error.message);
        else throw new Error('Ha ocurrido un error al insertar los departamentos del Perú ejecutando la migración.');
    }
}

PeruStatesMigration();