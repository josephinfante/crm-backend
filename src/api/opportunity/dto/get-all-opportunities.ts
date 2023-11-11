import { OpportunityError } from "../../../shared/errors";
import { Opportunity } from "../../../shared/schemas";

export async function GetAllOpportunities(page: number) {
    try {
        const { count, rows } = await Opportunity.findAndCountAll({
            limit: 100,
            offset: (page - 1) * 100,
        }).catch((_error) => { throw new OpportunityError("Ha ocurrido un error al tratar de obtener las oportunidades."); }).then(opportunity => opportunity);
        const reshapedOpportunities = rows.map(opportunity => ({
            id: opportunity.dataValues.id,
            contact_id: opportunity.dataValues.contact_id,
            career_id: opportunity.dataValues.career_id,
            semester_id: opportunity.dataValues.semester_id,
            createdAt: opportunity.dataValues.createdAt,
            updatedAt: opportunity.dataValues.updatedAt,
        }));
        return { opportunities: reshapedOpportunities, total_opportunities: count, total_pages: Math.ceil(count / 100), current_page: page };
    } catch (error) {
        if (error instanceof Error && error.message) throw new OpportunityError(error.message);
        else throw new Error("Ha ocurrido un error al obtener las oportunidades.");
    }
}