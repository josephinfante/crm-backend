import { CareerError } from "../../../shared/errors";
import { Career, School } from "../../../shared/schemas";

export async function GetCareer(id: string) {
    try {
        const career = await Career.findOne({ 
            where: { id: id },
            include: [{ model: School, attributes: ['name'] }],
        }).catch(_error => { throw new CareerError("Ha ocurrido un error al revisar la carrera.")}).then(career => career);
        if (!career) throw new CareerError(`La carrera con ID ${id} no existe.`);
        return {
            id: career.dataValues.id,
            name: career.dataValues.name,
            nickname: career.dataValues.nickname,
            code: career.dataValues.code,
            school: career.dataValues['school.name'],
            updatedAt: career.dataValues.updatedAt,
            createdAt: career.dataValues.createdAt,
        };
    } catch (error) {
        if (error instanceof Error && error.message) throw new CareerError(error.message);
        else throw new Error("Ha ocurrido un error al obtener la carrera.");
    }
}