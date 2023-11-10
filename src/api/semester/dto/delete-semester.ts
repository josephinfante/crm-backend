import { SemesterError } from "../../../shared/errors";
import { Semester } from "../../../shared/schemas";

export async function DeleteSemester(id: string) {
    try {
        const semester = await Semester.findOne({where: {id: id}}).catch(_error => {throw new SemesterError('Ha ocurrido un error al revisar el semestre académico.')}).then(semester => semester);
        if (!semester) throw new SemesterError(`El semestre académico con id ${id} no existe.`);
        await semester.destroy().catch(_error => {throw new SemesterError('Ha ocurrido un error al tratar de eliminar el semestre académico.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new SemesterError(error.message);
        else throw new Error('Ha habido un error al eliminar el semestre académico.');
    }
}