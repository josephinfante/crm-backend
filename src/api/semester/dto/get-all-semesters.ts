import { BusinessUnitError, SemesterError } from "../../../shared/errors";
import { BusinessUnit, Semester } from "../../../shared/schemas";

export async function GetAllSemesters() {
    try {
        const semesters = await BusinessUnit.findAll({
            include: [
                {
                    model: Semester,
                    as: 'semesters', // Use the 'as' option to specify the association alias
                    attributes: ['id', 'name', 'nickname', 'code', 'updatedAt', 'createdAt'],
                },
            ],
            raw: true,
        }).catch(_error => {throw new BusinessUnitError("Ha ocurrido un error al revisar los semestres académicos.")}).then(semesters => semesters);
        const reshapedSemesters = semesters.filter((business_unit:any) => business_unit['semesters.id'] !== null).map((business_unit: any) => ({
            id: business_unit['semesters.id'],
            name: business_unit['semesters.name'],
            nickname: business_unit['semesters.nickname'],
            code: business_unit['semesters.code'],
            business_unit: business_unit.name,
            updatedAt: business_unit['semesters.updatedAt'],
            createdAt: business_unit['semesters.createdAt'],
        }));        
        return reshapedSemesters;
    } catch (error) {
        if (error instanceof Error && error.message) throw new SemesterError(error.message);
        else throw new Error("Ha ocurrido un error al obtener los semestres académicos.");
    }
}