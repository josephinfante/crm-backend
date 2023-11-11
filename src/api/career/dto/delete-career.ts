import { CareerError, OpportunityError } from "../../../shared/errors";
import { Career, Opportunity } from "../../../shared/schemas";

export async function DeleteCareer(id: string) {
    try {
        const career = await Career.findOne({ where: { id: id }}).catch(_error => { throw new CareerError("Ha ocurrido un error al revisar la carrera.")}).then(career => career);
        if (!career) throw new CareerError(`La carrera con ID ${id} no existe.`);
        const opportunity_associated = await Opportunity.findAll({ where: { career_id: id } }).catch(_error => { throw new OpportunityError("Ha ocurrido un error al revisar las oportunidades.")}).then(opportunity => opportunity);
        if (opportunity_associated.length > 0) throw new OpportunityError(`La carrera con ID ${id} no puede ser eliminada porque tiene ${opportunity_associated.length} oportunidades asociadas.`);
        await career.destroy().catch(_error => { throw new CareerError("Ha ocurrido un error al tratar de eliminar la carrera.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new CareerError(error.message);
        else throw new Error("Ha ocurrido un error al eliminar la carrera.");
    }
}