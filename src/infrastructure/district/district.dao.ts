import { DistrictError } from "../../shared/errors";
import { DistrictModel } from "../../shared/models";

export async function FindDistrictByCityId (city_id: string) {
    try {
        const districts = await DistrictModel.findAll({ where: { city_id: city_id}})
            .then(districts => districts.map(district => {
                return {
                    id: district.dataValues.id,
                    name: district.dataValues.name,
                    code: district.dataValues.code,
                    hidden: district.dataValues.hidden,
                    deleted: district.dataValues.deleted,
                    createdAt: district.dataValues.createdAt,
                    updatedAt: district.dataValues.updatedAt,
                };
            }))
            .catch(_error => { throw new DistrictError("Ha ocurrido un error al tratar de buscar los distritos de la provincia indicada.") });

        return districts;
    } catch (error) {
        if (error instanceof Error && error.message) throw new DistrictError(error.message);
        else throw new Error("Ha ocurrido un error al buscar los distritos.");
    }
}