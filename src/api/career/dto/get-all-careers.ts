import { CareerError } from "../../../shared/errors";
import { Career, School } from "../../../shared/schemas";

export async function GetAllCareers() {
    try {
        const careers = await Career.findAll({ 
            include: [{ model: School, attributes: ['name'] }],
            raw: true,
        }).catch(_error => { throw new CareerError("Ha ocurrido un error al revisar la carrera.")}).then(careers => careers);
        const reshapedCareers = careers.map((career: any) => ({
            id: career.id,
            name: career.name,
            nickname: career.nickname,
            code: career.code,
            school: career['school.name'],
            updatedAt: career.updatedAt,
            createdAt: career.createdAt,
        }));
        return reshapedCareers;
    } catch (error) {
        if (error instanceof Error && error.message) throw new CareerError(error.message);
        else throw new Error("Ha ocurrido un error al obtener la carrera.");
    }
}