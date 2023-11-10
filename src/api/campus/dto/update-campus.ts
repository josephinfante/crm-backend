import { BusinessUnitError, CampusError } from "../../../shared/errors";
import { BusinessUnit, Campus } from "../../../shared/schemas";
import { checkRecordExistence, errorMessage } from "../../../shared/utils";
import { UpdateCampusInterface } from "../campus.type";

export async function UpdateCampus(id: string, data: UpdateCampusInterface) {
    try {
        const campus = await Campus.findOne({ where: { id: id }}).catch(_error => { throw new CampusError("Ha ocurrido un error al revisar la sede.")}).then(campus => campus);
        if (!campus) throw new CampusError(`La sede con id ${id} no existe.`);
        const business_unit_exist = data.business_unit ? await BusinessUnit.findOne({ where : { name: data.business_unit }}).catch(_error => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.")}).then(business_unit => business_unit) : null;
        if (data.business_unit && !business_unit_exist) throw new BusinessUnitError(`La unidad de negocio '${data.business_unit}' no existe.`);
        const campus_exists = await checkRecordExistence(Campus, id, data, CampusError);
        if (campus_exists.length) throw new CampusError(errorMessage('una sede', data));
        campus.set({
            name: data.name ?? campus.dataValues.name,
            nickname: data.nickname ?? campus.dataValues.nickname,
            code: data.code ?? campus.dataValues.code,
            business_unit_id: (data.business_unit && business_unit_exist) && (campus.dataValues.business_unit_id !== business_unit_exist.dataValues.id) ? business_unit_exist?.dataValues.id : campus.dataValues.business_unit_id,
            updatedAt: new Date(),
        });
        await campus.save().catch(_error => { throw new CampusError("Ha ocurrido un error al tratar de actualizar la sede.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new CampusError(error.message);
        else throw new Error("Ha ocurrido un error al actualizar la sede.");
    }
}