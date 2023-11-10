import { BusinessUnitError, SemesterError } from "../../../shared/errors";
import { BusinessUnit, Semester } from "../../../shared/schemas";
import { checkRecordExistence, errorMessage } from "../../../shared/utils";
import { UpdateSemesterInterface } from "../semester.type";

export async function UpdateSemester(id: string, data: UpdateSemesterInterface) {
    try {
        const semester = await Semester.findOne({ where: { id: id }}).catch(_error => { throw new SemesterError("Ha ocurrido un error al revisar semestre académico.")}).then(semester => semester);
        if (!semester) throw new SemesterError(`El semestre académico con id ${id} no existe.`);
        const business_unit_exist = data.business_unit ? await BusinessUnit.findOne({ where : { name: data.business_unit }}).catch(_error => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.")}).then(business_unit => business_unit) : null;
        if (data.business_unit && !business_unit_exist) throw new BusinessUnitError(`La unidad de negocio '${data.business_unit}' no existe.`);
        const semester_exists = await checkRecordExistence(Semester, id, data, SemesterError, "Ha ocurrido un error al revisar el semestre académico.");
        if (semester_exists.length) throw new SemesterError(errorMessage('un semestre académico', data));
        semester.set({
            name: data.name ?? semester.dataValues.name,
            nickname: data.nickname ?? semester.dataValues.nickname,
            code: data.code ?? semester.dataValues.code,
            business_unit_id: (data.business_unit && business_unit_exist) && (semester.dataValues.business_unit_id !== business_unit_exist.dataValues.id) ? business_unit_exist?.dataValues.id : semester.dataValues.business_unit_id,
            updatedAt: new Date(),
        });
        await semester.save().catch(_error => { throw new SemesterError("Ha ocurrido un error al tratar de actualizar el semestre académico.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new SemesterError(error.message);
        else throw new Error("Ha ocurrido un error al actualizar el semestre académico.");
    }
}