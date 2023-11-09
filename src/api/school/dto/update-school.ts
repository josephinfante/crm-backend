import { BusinessUnitError, SchoolError } from "../../../shared/errors";
import { BusinessUnit, School } from "../../../shared/schemas";
import { checkRecordExistence, errorMessage } from "../../../shared/utils";
import { UpdateSchoolInterface } from "../school.type";

export async function UpdateSchool(id: string, data: UpdateSchoolInterface) {
    try {
        const school = await School.findOne({ where: { id: id }}).catch(_error => { throw new SchoolError("Ha ocurrido un error al revisar la escuela profesional.")}).then(school => school);
        if (!school) throw new SchoolError(`La escuela profesional con id ${id} no existe.`);
        const business_unit_exist = data.business_unit ? await BusinessUnit.findOne({ where : { name: data.business_unit }}).catch(_error => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.")}).then(business_unit => business_unit) : null;
        if (data.business_unit && !business_unit_exist) throw new BusinessUnitError(`La unidad de negocio '${data.business_unit}' no existe.`);
        const school_exists = await checkRecordExistence(School, id, data, SchoolError);
        if (school_exists.length) throw new SchoolError(errorMessage('una escuela profesional', data));
        school.set({
            name: data.name ?? school.dataValues.name,
            nickname: data.nickname ?? school.dataValues.nickname,
            code: data.code ?? school.dataValues.code,
            business_unit_id: (data.business_unit && business_unit_exist) && (school.dataValues.business_unit_id !== business_unit_exist.dataValues.id) ? business_unit_exist?.dataValues.id : school.dataValues.business_unit_id,
            updatedAt: new Date(),
        });
        await school.save().catch(_error => { throw new SchoolError("Ha ocurrido un error al tratar de actualizar la escuela profesional.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new SchoolError(error.message);
        else throw new Error("Ha ocurrido un error al actualizar la escuela profesional.");
    }
}