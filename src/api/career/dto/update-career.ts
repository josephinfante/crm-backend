import { CareerError, SchoolError } from "../../../shared/errors";
import { Career, School } from "../../../shared/schemas";
import { checkRecordExistence, errorMessage } from "../../../shared/utils";
import { UpdateCareerInterface } from "../career.type";

export async function UpdateCareer(id: string, data: UpdateCareerInterface) {
    try {
        const career = await Career.findOne({ where: { id: id }}).catch(_error => { throw new CareerError("Ha ocurrido un error al revisar la carrera.")}).then(career => career);
        if (!career) throw new CareerError(`La carrera con ID ${id} no existe.`);
        const school_exists = data.school ? await School.findOne({ where : { name: data.school }}).catch(_error => { throw new SchoolError("Ha ocurrido un error al revisar la escuela profesional.")}).then(school => school) : null;
        if (data.school && !school_exists) throw new SchoolError(`La escuela profesional '${data.school}' no existe.`);
        const career_exists = await checkRecordExistence(Career, id, data, CareerError, "Ha ocurrido un error al revisar la carrera.");
        if (career_exists.length) throw new CareerError(errorMessage('una carrera', data));
        career.set({
            name: data.name ?? career.dataValues.name,
            nickname: data.nickname ?? career.dataValues.nickname,
            code: data.code ?? career.dataValues.code,
            school_id: (data.school && school_exists) && (career.dataValues.school_id !== school_exists.dataValues.id) ? school_exists.dataValues.id : career.dataValues.school_id,
            updatedAt: new Date(),
        });
        await career.save().catch(_error => { throw new CareerError("Ha ocurrido un error al tratar de actualizar la carrera.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new CareerError(error.message);
        else throw new Error("Ha ocurrido un error al actualizar la carrera.");
    }
}