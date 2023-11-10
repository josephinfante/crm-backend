import { BusinessUnitError, CampusError } from "../../../shared/errors";
import { BusinessUnit, Campus } from "../../../shared/schemas";

export async function GetAllCampuses() {
    try {
        const campuses = await BusinessUnit.findAll({
            include: [
                {
                    model: Campus,
                    as: 'campuses', // Use the 'as' option to specify the association alias
                    attributes: ['id', 'name', 'nickname', 'code', 'updatedAt', 'createdAt'],
                },
            ],
            raw: true,
        }).catch(_error => {throw new BusinessUnitError("Ha ocurrido un error al revisar las sedes.")}).then(schools => schools);
        const reshapedCampuses = campuses.filter((business_unit:any) => business_unit['campuses.id'] !== null).map((business_unit: any) => ({
            id: business_unit['campuses.id'],
            name: business_unit['campuses.name'],
            nickname: business_unit['campuses.nickname'],
            code: business_unit['campuses.code'],
            business_unit: business_unit.name,
            updatedAt: business_unit['campuses.updatedAt'],
            createdAt: business_unit['campuses.createdAt'],
        }));        
        return reshapedCampuses;
    } catch (error) {
        if (error instanceof Error && error.message) throw new CampusError(error.message);
        else throw new Error("Ha ocurrido un error al obtener las sedes.");
    }
}