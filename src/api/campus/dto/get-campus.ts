import { BusinessUnitError, CampusError } from "../../../shared/errors";
import { BusinessUnit, Campus } from "../../../shared/schemas";

export async function GetCampus(id: string) {
    try {
        const campus: any = await BusinessUnit.findOne({
            include: [
                {
                    model: Campus,
                    as: 'campuses', // Use the 'as' option to specify the association alias
                    attributes: ['id', 'name', 'nickname', 'code', 'updatedAt', 'createdAt'],
                    where: { id: id },
                },
            ],
            raw: true,
        }).catch(_error => {throw new BusinessUnitError("Ha ocurrido un error al revisar la sede.")}).then(school => school);
        if (!campus) throw new CampusError(`La sede con ID ${id} no existe.`);
        return {
            id: campus['campuses.id'],
            name: campus['campuses.name'],
            nickname: campus['campuses.nickname'],
            code: campus['campuses.code'],
            business_unit: campus.name,
            updatedAt: campus['campuses.updatedAt'],
            createdAt: campus['campuses.createdAt'],
        };
    } catch (error) {
        if (error instanceof Error && error.message) throw new CampusError(error.message);
        else throw new Error("Ha ocurrido un error al obtener las sedes.");
    }
}