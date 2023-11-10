import { CampusError } from "../../../shared/errors";
import { Campus } from "../../../shared/schemas";

export async function DeleteCampus(id: string) {
    try {
        const campus = await Campus.findOne({where: {id: id}}).catch(_error => {throw new CampusError('Ha ocurrido un error al revisar la sede.')}).then(campus => campus);
        if (!campus) throw new CampusError(`La sede con id ${id} no existe.`);
        await campus.destroy().catch(_error => {throw new CampusError('Ha ocurrido un error al tratar de eliminar la sede.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new CampusError(error.message);
        else throw new Error('Ha habido un error al eliminar la sede.');
    }
}