import { peru_cities_data } from "../shared/data";
import { CityError, StateError } from "../shared/errors";
import { CityModel, StateModel } from "../shared/models";
import { UniqueID } from "../shared/utils";

async function PeruCitiesMigration() {
    try {
        const cities: {}[] = [];
        const states = await StateModel.findAll()
            .then(states => states.map(state => state.dataValues))
            .catch(_error => { throw new StateError('Ha ocurrido un error al tratar de obtener los departamentos del Perú.') });
        for (const city of peru_cities_data) {
            const state = states.find(state => state.code === city.state_code);
            if (state) {
                cities.push({
                    id: UniqueID.generate(),
                    name: city.name,
                    code: state.code + city.code,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    state_id: state.id,
                });
            }
        }
        await CityModel.bulkCreate(cities).catch(_error => { throw new CityError('Ha ocurrido un error al tratar de insertar las provincias del Perú.') });
    } catch (error) {
        if (error instanceof Error && error.message) throw new CityError(error.message);
        else throw new Error('Ha ocurrido un error al insertar las provincias del Perú ejecutando la migración.');
    }
}

PeruCitiesMigration();