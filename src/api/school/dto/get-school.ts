import { BusinessUnitError, SchoolError } from "../../../shared/errors";
import { BusinessUnit, School } from "../../../shared/schemas";

export async function GetSchool(id: string) {
    try {
        const school: any = await BusinessUnit.findOne({
            include: [
                {
                    model: School,
                    as: 'schools', // Use the 'as' option to specify the association alias
                    attributes: ['id', 'name', 'nickname', 'code', 'updatedAt', 'createdAt'],
                    where: { id: id },
                },
            ],
            raw: true,
        }).catch(_error => {throw new BusinessUnitError("Ha ocurrido un error al revisar las escuela profesional.")}).then(school => school);
        if (!school) throw new SchoolError(`La escuela profesional con ID ${id} no existe.`);
        return {
            id: school['schools.id'],
            name: school['schools.name'],
            nickname: school['schools.nickname'],
            code: school['schools.code'],
            business_unit: school.name,
            updatedAt: school['schools.updatedAt'],
            createdAt: school['schools.createdAt'],
        };
    } catch (error) {
        if (error instanceof Error && error.message) throw new SchoolError(error.message);
        else throw new Error("Ha ocurrido un error al obtener la escuela profesional.");
    }
}