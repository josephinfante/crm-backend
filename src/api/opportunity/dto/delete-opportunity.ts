import { OpportunityError } from "../../../shared/errors";
import { Opportunity } from "../../../shared/schemas";

export async function DeleteOpportunity(id: string) {
    try {
        const opportunity = await Opportunity.findOne({ where: { id } }).catch((_error) => {throw new OpportunityError("Ha ocurrido un error al revisar la oportunidad.")}).then(opportunity => opportunity);
        if (!opportunity) throw new OpportunityError(`La oportunidad con ID ${id} no existe.`);
        await opportunity.destroy().catch((_error) => {throw new OpportunityError("Ha ocurrido un error al eliminar la oportunidad.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new OpportunityError(error.message);
        else throw new Error("Ha ocurrido un error al eliminar la oportunidad.");
    }
}