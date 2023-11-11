import { OpportunityError, SemesterError } from "../../../shared/errors";
import { Opportunity, Semester } from "../../../shared/schemas";

export async function DeleteSemester(id: string) {
    try {
        const semester = await Semester.findOne({where: {id: id}}).catch(_error => {throw new SemesterError('Ha ocurrido un error al revisar el semestre académico.')}).then(semester => semester);
        if (!semester) throw new SemesterError(`El semestre académico con id ${id} no existe.`);
        const opportunity_associated = await Opportunity.findAll({ where: { semester_id: id } }).catch(_error => { throw new OpportunityError("Ha ocurrido un error al revisar las oportunidades.")}).then(opportunity => opportunity);
        if (opportunity_associated.length > 0) throw new OpportunityError(`El semestre con ID ${id} no puede ser eliminado porque tiene ${opportunity_associated.length} oportunidades asociadas.`);
        await semester.destroy().catch(_error => {throw new SemesterError('Ha ocurrido un error al tratar de eliminar el semestre académico.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new SemesterError(error.message);
        else throw new Error('Ha habido un error al eliminar el semestre académico.');
    }
}