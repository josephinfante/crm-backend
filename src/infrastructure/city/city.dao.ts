import { CityError } from "../../shared/errors";
import { CityModel } from "../../shared/models";

export async function FindCitybyStateId (state_id: string) {
    try {
        const cities = await CityModel.findAll({ where: { state_id: state_id}})
            .then(cities => cities.map(city => {
                return {
                    id: city.dataValues.id,
                    name: city.dataValues.name,
                    code: city.dataValues.code,
                    hidden: city.dataValues.hidden,
                    deleted: city.dataValues.deleted,
                    createdAt: city.dataValues.createdAt,
                    updatedAt: city.dataValues.updatedAt,
                };
            }))
            .catch(_error => { throw new CityError("Ha ocurrido un error al tratar de buscar las provincias del departamento indicado.") });

        return cities;
    } catch (error) {
        if (error instanceof Error && error.message) throw new CityError(error.message);
        else throw new Error("Ha ocurrido un error al buscar las provincias.");
    }
}