import { BusinessUnitError, SchoolError } from "../../../shared/errors";
import { BusinessUnit, School } from "../../../shared/schemas";

export async function GetAllSchools() {
    try {
        const business_units = await BusinessUnit.findAll({
            include: [
                {
                    model: School,
                    as: 'schools', // Use the 'as' option to specify the association alias
                    attributes: ['id', 'name', 'nickname', 'code', 'updatedAt', 'createdAt'],
                },
            ],
            raw: true,
        }).catch(_error => { console.log(_error);throw new BusinessUnitError("Ha ocurrido un error al revisar las escuela profesional.")}).then(business_units => business_units);
        const reshapedSchools = business_units.filter((business_unit:any) => business_unit['schools.id'] !== null).map((business_unit: any) => ({
            id: business_unit['schools.id'],
            name: business_unit['schools.name'],
            nickname: business_unit['schools.nickname'],
            code: business_unit['schools.code'],
            business_unit: business_unit.name,
            updatedAt: business_unit['schools.updatedAt'],
            createdAt: business_unit['schools.createdAt'],
        }));        
        return reshapedSchools;
    } catch (error) {
        if (error instanceof Error && error.message) throw new SchoolError(error.message);
        else throw new Error("Ha ocurrido un error al obtener las escuela profesional.");
    }
}