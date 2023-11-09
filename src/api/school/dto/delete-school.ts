import { CareerError, SchoolError } from "../../../shared/errors";
import { Career, School } from "../../../shared/schemas";

export async function DeleteSchool(id: string) {
    try {
        const school = await School.findOne({where: {id: id}}).catch(_error => {throw new SchoolError('Ha ocurrido un error al revisar la escuela profesional.')}).then(school => school);
        if (!school) throw new SchoolError(`La escuela profesional con id ${id} no existe.`);
        const careerWithSchool = await Career.findAll({where: {school_id: id}}).catch(_error => {throw new CareerError(`Ha ocurrido un error al revisar si hay carreras en la escuela profesional '${school.dataValues.name}'.`)}).then(users => users);
        if (careerWithSchool.length > 0) throw new SchoolError(`La escuela profesional '${school.dataValues.name}' no puede ser eliminada, ya que tiene ${careerWithSchool.length} carrera(s) asociada(s).`);
        await school.destroy().catch(_error => {console.log(_error);throw new SchoolError('Ha ocurrido un error al tratar de eliminar la escuela profesional.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new SchoolError(error.message);
        else throw new Error('Ha habido un error al eliminar la escuela profesional.');
    }
}