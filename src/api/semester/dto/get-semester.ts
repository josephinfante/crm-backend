import { BusinessUnitError, SemesterError } from "../../../shared/errors";
import { BusinessUnit, Semester } from "../../../shared/schemas";

export async function GetSemester(id: string) {
    try {
        const semester: any = await BusinessUnit.findOne({
            include: [
                {
                    model: Semester,
                    as: 'semesters', // Use the 'as' option to specify the association alias
                    attributes: ['id', 'name', 'nickname', 'code', 'updatedAt', 'createdAt'],
                    where: { id: id },
                },
            ],
            raw: true,
        }).catch(_error => {throw new BusinessUnitError("Ha ocurrido un error al revisar el semestre académico.")}).then(semester => semester);
        if (!semester) throw new SemesterError(`El semestre académico con ID ${id} no existe.`);
        return {
            id: semester['semesters.id'],
            name: semester['semesters.name'],
            nickname: semester['semesters.nickname'],
            code: semester['semesters.code'],
            business_unit: semester.name,
            updatedAt: semester['semesters.updatedAt'],
            createdAt: semester['semesters.createdAt'],
        };
    } catch (error) {
        if (error instanceof Error && error.message) throw new SemesterError(error.message);
        else throw new Error("Ha ocurrido un error el semestre académico.");
    }
}