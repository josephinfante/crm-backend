import { SchoolError } from "../../../shared/errors";
import { School } from "../../../shared/schemas";

export async function GetSchool(id: string) {
    try {
        const school = await School.findOne({ where: { id: id }}).catch(_error => { throw new SchoolError("Ha ocurrido un error al revisar la escuela profesional.")}).then(school => school);
        if (!school) throw new SchoolError(`La escuela profesional con id ${id} no existe.`);
        return school;
    } catch (error) {
        if (error instanceof Error && error.message) throw new SchoolError(error.message);
        else throw new Error("Ha ocurrido un error al obtener la escuela profesional.");
    }
}