import { peru_districts_data } from "../shared/data";
import { CityError, DistrictError } from "../shared/errors";
import { CityModel, DistrictModel } from "../shared/models";
import { UniqueID } from "../shared/utils";

async function PeruDistrictsMigration() {
    try {
        const districts: {}[] = [];
        const cities = await CityModel.findAll()
            .then(districts => districts.map(district => district.dataValues))
            .catch(_error => { throw new CityError('Ha ocurrido un error al tratar de obtener las provincias del Perú.') });
        for (const district of peru_districts_data) {
            const city = cities.find(city => city.code === (district.state_code + district.city_code));
            if (city) {
                districts.push({
                    id: UniqueID.generate(),
                    name: district.name,
                    code: city.code + district.code,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    city_id: city.id,
                });
            }
        }
        await DistrictModel.bulkCreate(districts).catch(_error => { throw new DistrictError('Ha ocurrido un error al tratar de insertar los distritos del Perú.') });
    } catch (error) {
        if (error instanceof Error && error.message) throw new DistrictError(error.message);
        else throw new Error('Ha ocurrido un error al insertar los distritos del Perú ejecutando la migración.');
    }
}

PeruDistrictsMigration();