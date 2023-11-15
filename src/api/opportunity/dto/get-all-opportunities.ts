import { OpportunityError } from "../../../shared/errors";
import { Career, Contact, Opportunity, Semester, User } from "../../../shared/schemas";

export async function GetAllOpportunities(page: number) {
    try {
        const { count, rows } = await Opportunity.findAndCountAll({
            include: [
                { model: Contact, attributes: ['id', 'first_name', 'last_name_1'] }, 
                { model: Career, attributes: ['id', 'name'] }, 
                { model: Semester, attributes: ['id', 'name'] }, 
                { model: User, attributes: ['id', 'first_name', 'last_name'] }
            ],
            limit: 100,
            offset: (page - 1) * 100,
        }).catch((_error) => {throw new OpportunityError("Ha ocurrido un error al tratar de obtener las oportunidades."); }).then(opportunity => opportunity);
        const reshapedOpportunities = rows.map(opportunity => ({
            id: opportunity.dataValues.id,
            contact: {
                id: opportunity.dataValues.contact.dataValues.id,
                name: `${opportunity.dataValues.contact.dataValues.first_name} ${opportunity.dataValues.contact.dataValues.last_name_1}`,
            },
            career: {
                id: opportunity.dataValues.career.dataValues.id,
                name: opportunity.dataValues.career.dataValues.name,
            },
            semester: {
                id: opportunity.dataValues.semester.dataValues.id,
                name: opportunity.dataValues.semester.dataValues.name,
            },
            user: {
                id: opportunity.dataValues.user.dataValues.id,
                name: `${opportunity.dataValues.user.dataValues.first_name} ${opportunity.dataValues.user.dataValues.last_name}`,
            },
            createdAt: opportunity.dataValues.createdAt,
            updatedAt: opportunity.dataValues.updatedAt,
        }));
        return { opportunities: reshapedOpportunities, total_opportunities: count, total_pages: Math.ceil(count / 100), current_page: page };
    } catch (error) {
        if (error instanceof Error && error.message) throw new OpportunityError(error.message);
        else throw new Error("Ha ocurrido un error al obtener las oportunidades.");
    }
}