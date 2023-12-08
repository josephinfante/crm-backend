import { IAccessPermission } from "../../domain/auth/access.type";
import { Opportunity } from "../../domain/opportunity/opportunity";
import { IOpportunityResponse, OpportunityPresenter } from "../../interfaces/presenters/opportunity.presenter";
import { BusinessUnitError, CampusError, CareerError, CollegeError, ContactChannelError, ContactError, OpportunityError, PeriodError, SalePhaseError } from "../../shared/errors";
import { BusinessUnitModel, CampusModel, CareerModel, CollegeModel, ContactChannelModel, ContactModel, OpportunityModel, PeriodModel, SalePhaseModel } from "../../shared/models";
import { ListCondition, UniqueID } from "../../shared/utils";

class OpportunityDao {
    async create(access: IAccessPermission, opportunity: Opportunity): Promise<IOpportunityResponse> {
        try {
            let competitor;
            let contact;
            let career;
            let period;
            let campus;
            let business_unit;
            let sale_phase;
            let contact_channel;
            if (opportunity.competitor_id) {
                competitor = await CollegeModel.findByPk(opportunity.competitor_id)
                    .then(competitor => competitor)
                    .catch((_error) => { throw new CollegeError("El competidor no existe.") });
            }
            if (opportunity.contact_id) {
                contact = await ContactModel.findByPk(opportunity.contact_id)
                    .then(contact => contact)
                    .catch((_error) => { throw new ContactError("El contacto no existe.") });
            }
            if (opportunity.career_id) {
                career = await CareerModel.findByPk(opportunity.career_id)
                    .then(career => career)
                    .catch((_error) => { throw new CareerError("La carrera no existe.") });
            }
            if (opportunity.period_id) {
                period = await PeriodModel.findByPk(opportunity.period_id)
                    .then(period => period)
                    .catch((_error) => { throw new PeriodError("El periodo no existe.") });
            }
            if (opportunity.campus_id) {
                campus = await CampusModel.findByPk(opportunity.campus_id)
                    .then(campus => campus)
                    .catch((_error) => { throw new CampusError("El campus no existe.") });
            }
            if (opportunity.business_unit_id) {
                business_unit = await BusinessUnitModel.findByPk(opportunity.business_unit_id)
                    .then(business_unit => business_unit)
                    .catch((_error) => { throw new BusinessUnitError("La unidad de negocio no existe.") });
            }
            if (opportunity.sale_phase_id) {
                sale_phase = await SalePhaseModel.findByPk(opportunity.sale_phase_id)
                    .then(sale_phase => sale_phase)
                    .catch((_error) => { throw new SalePhaseError("La fase de venta no existe.") });
            }
            if (opportunity.contact_channel_id) {
                contact_channel = await ContactChannelModel.findByPk(opportunity.contact_channel_id)
                    .then(contact_channel => contact_channel)
                    .catch((_error) => { throw new ContactChannelError("El canal de contacto no existe.") });
            }
            const new_opportunity = {
                id: UniqueID.generate(),
                reserved_enrollment: opportunity.reserved_enrollment,
                reserved_period: opportunity.reserved_period,
                postulation_type: opportunity.postulation_type,
                postulation_date: opportunity.postulation_date,
                tentative_enrollment_date: opportunity.tentative_enrollment_date,
                termination_motive: opportunity.termination_motive,
                migration_code: opportunity.migration_code,
                last_interaction: opportunity.last_interaction,
                interest_level: opportunity.interest_level,
                registration_form_date: opportunity.registration_form_date,
                purpose_full_interaction: opportunity.purpose_full_interaction,
                hidden: false,
                deleted: false,
                updatedAt: Date.now(),
                createdAt: Date.now(),
                competitor_id: opportunity.competitor_id,
                contact_id: opportunity.contact_id,
                career_id: opportunity.career_id,
                period_id: opportunity.period_id,
                campus_id: opportunity.campus_id,
                business_unit_id: opportunity.business_unit_id,
                sale_phase_id: opportunity.sale_phase_id,
                contact_channel_id: opportunity.contact_channel_id,
                user_id: access.user_id,
            }

            await OpportunityModel.create(new_opportunity).catch((_error) => { throw new OpportunityError("Ha ocurrido un error al tratar de crear la oportunidad.") });
            return OpportunityPresenter(new_opportunity, access, competitor?.dataValues, contact?.dataValues, career?.dataValues, period?.dataValues, campus?.dataValues, business_unit?.dataValues, sale_phase?.dataValues, contact_channel?.dataValues, {id: access.user_id, name: access.user_name});
        } catch (error) {
            if (error instanceof Error && error.message) throw new OpportunityError(error.message);
            else throw new Error("Ha ocurrido un error al crear la oportunidad.");
        }
    }
    async update(access: IAccessPermission, id: string, opportunity: Opportunity): Promise<IOpportunityResponse> {
        try {
            let competitor;
            let contact;
            let career;
            let period;
            let campus;
            let business_unit;
            let sale_phase;
            let contact_channel;
            const opportunity_exist = access.super_admin === true ?
                await OpportunityModel.findOne({
                        where: { id: id },
                        include: [
                            { model: CollegeModel, as: "competitor" },
                            { model: ContactModel },
                            { model: CareerModel },
                            { model: PeriodModel },
                            { model: CampusModel },
                            { model: BusinessUnitModel },
                            { model: SalePhaseModel },
                            { model: ContactChannelModel },
                        ]
                    })
                    .then(opportunity => opportunity)
                    .catch((_error) => { throw new OpportunityError("Ha ocurrido un error al revisar la oportunidad.") }) :
                await OpportunityModel.findOne({ 
                        where: { id: id, user_id: access.user_id },
                        include: [
                            { model: CollegeModel, as: "competitor" },
                            { model: ContactModel },
                            { model: CareerModel },
                            { model: PeriodModel },
                            { model: CampusModel },
                            { model: BusinessUnitModel },
                            { model: SalePhaseModel },
                            { model: ContactChannelModel },
                        ]
                    })
                    .then(opportunity => opportunity)
                    .catch((_error) => { throw new OpportunityError("Ha ocurrido un error al revisar la oportunidad.") });

            if (!opportunity_exist) throw new OpportunityError(`La oportunidad con ID ${id} no existe.`);

            competitor = opportunity.competitor_id !== opportunity_exist.dataValues.competitor?.dataValues.id ?
                await CollegeModel.findByPk(opportunity.competitor_id)
                    .then(competitor => competitor)
                    .catch((_error) => { throw new CollegeError("Ha ocurrido un error al buscar el competidor.") }) :
                opportunity_exist.dataValues.competitor;

            contact = opportunity.contact_id !== opportunity_exist.dataValues.contact?.dataValues.id ? 
                await ContactModel.findByPk(opportunity.contact_id)
                    .then(contact => contact)
                    .catch((_error) => { throw new ContactError("Ha ocurrido un error al buscar el contacto.") }) :
                opportunity_exist.dataValues.contact;
            
            career = opportunity.career_id !== opportunity_exist.dataValues.career?.dataValues.id ?
                await CareerModel.findByPk(opportunity.career_id)
                    .then(career => career)
                    .catch((_error) => { throw new CareerError("Ha ocurrido un error al buscar la carrera.") }) :
                opportunity_exist.dataValues.career;

            period = opportunity.period_id !== opportunity_exist.dataValues.period?.dataValues.id ?
                await PeriodModel.findByPk(opportunity.period_id)
                    .then(period => period)
                    .catch((_error) => { throw new PeriodError("Ha ocurrido un error al buscar el periodo.") }) :
                opportunity_exist.dataValues.period;

            campus = opportunity.campus_id !== opportunity_exist.dataValues.campus?.dataValues.id ?
                await CampusModel.findByPk(opportunity.campus_id)
                    .then(campus => campus)
                    .catch((_error) => { throw new CampusError("Ha ocurrido un error al buscar el campus.") }) :
                opportunity_exist.dataValues.campus;

            business_unit = opportunity.business_unit_id !== opportunity_exist.dataValues.business_unit?.dataValues.id ?
                await BusinessUnitModel.findByPk(opportunity.business_unit_id)
                    .then(business_unit => business_unit)
                    .catch((_error) => { throw new BusinessUnitError("Ha ocurrido un error al buscar la unidad de negoci.") }) :
                opportunity_exist.dataValues.business_unit;

            sale_phase = opportunity.sale_phase_id !== opportunity_exist.dataValues.sale_phase?.dataValues.id ?
                await SalePhaseModel.findByPk(opportunity.sale_phase_id)
                    .then(sale_phase => sale_phase)
                    .catch((_error) => { throw new SalePhaseError("Ha ocurrido un error al buscar la fase de venta.") }) :
                opportunity_exist.dataValues.sale_phase;

            contact_channel = opportunity.contact_channel_id !== opportunity_exist.dataValues.contact_channel?.dataValues.id ?
                await ContactChannelModel.findByPk(opportunity.contact_channel_id)
                    .then(contact_channel => contact_channel)
                    .catch((_error) => { throw new ContactChannelError("Ha ocurrido un error al buscar el canal de contacto.") }) :
                opportunity_exist.dataValues.contact_channel;

            opportunity_exist.set({
                reserved_enrollment: opportunity.reserved_enrollment ?? opportunity_exist.dataValues.reserved_enrollment,
                reserved_period: opportunity.reserved_period ?? opportunity_exist.dataValues.reserved_period,
                postulation_type: opportunity.postulation_type ?? opportunity_exist.dataValues.postulation_type,
                postulation_date: opportunity.postulation_date ?? opportunity_exist.dataValues.postulation_date,
                tentative_enrollment_date: opportunity.tentative_enrollment_date ?? opportunity_exist.dataValues.tentative_enrollment_date,
                termination_motive: opportunity.termination_motive ?? opportunity_exist.dataValues.termination_motive,
                migration_code: opportunity.migration_code ?? opportunity_exist.dataValues.migration_code,
                last_interaction: opportunity.last_interaction ?? opportunity_exist.dataValues.last_interaction,
                interest_level: opportunity.interest_level ?? opportunity_exist.dataValues.interest_level,
                registration_form_date: opportunity.registration_form_date ?? opportunity_exist.dataValues.registration_form_date,
                purpose_full_interaction: opportunity.purpose_full_interaction ?? opportunity_exist.dataValues.purpose_full_interaction,
                hidden: opportunity.hidden ?? opportunity_exist.dataValues.hidden,
                updatedAt: Date.now(),
                competitor_id: competitor.dataValues.id,
                contact_id: contact.dataValues.id,
                career_id: career.dataValues.id,
                period_id: period.dataValues.id,
                campus_id: campus.dataValues.id,
                business_unit_id: business_unit.dataValues.id,
                sale_phase_id: sale_phase.dataValues.id,
                contact_channel_id: contact_channel.dataValues.id,
            });

            const updated = await opportunity_exist.save()
                .then(opportunity => opportunity)
                .catch((_error) => { throw new OpportunityError("Ha ocurrido un error al tratar de actualizar la oportunidad.") });

            return OpportunityPresenter(updated.dataValues, access, competitor?.dataValues, contact?.dataValues, career?.dataValues, period?.dataValues, campus?.dataValues, business_unit?.dataValues, sale_phase?.dataValues, contact_channel?.dataValues, {id: access.user_id, name: access.user_name});
        } catch (error) {
            if (error instanceof Error && error.message) throw new OpportunityError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar la oportunidad.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const opportunity_exist = access.super_admin === true ?
                await OpportunityModel.findByPk(id)
                    .then(opportunity => opportunity)
                    .catch((_error) => { throw new OpportunityError("Ha ocurrido un error al revisar la oportunidad.") }) :
                await OpportunityModel.findOne({ where: { id: id, user_id: access.user_id }})
                    .then(opportunity => opportunity)
                    .catch((_error) => { throw new OpportunityError("Ha ocurrido un error al revisar la oportunidad.") });

            if (!opportunity_exist) throw new OpportunityError(`La oportunidad con ID ${id} no existe.`);

            opportunity_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });

            await opportunity_exist.save().catch((_error) => { throw new OpportunityError("Ha ocurrido un error al tratar de eliminar la oportunidad.") });
        } catch (error) {
            if (error instanceof Error && error.message) throw new OpportunityError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar la oportunidad.");
        }
    }
    async findById(access: IAccessPermission, id: string): Promise<IOpportunityResponse> {
        try {
            const opportunity_exist = access.super_admin === true ?
                await OpportunityModel.findOne({
                        where: { id: id },
                        include: [
                            { model: CollegeModel, as: "competitor" },
                            { model: ContactModel },
                            { model: CareerModel },
                            { model: PeriodModel },
                            { model: CampusModel },
                            { model: BusinessUnitModel },
                            { model: SalePhaseModel },
                            { model: ContactChannelModel },
                        ]
                    })
                    .then(opportunity => opportunity)
                    .catch((_error) => { throw new OpportunityError("Ha ocurrido un error al revisar la oportunidad.") }) :
                await OpportunityModel.findOne({ 
                        where: { id: id, user_id: access.user_id },
                        include: [
                            { model: CollegeModel, as: "competitor" },
                            { model: ContactModel },
                            { model: CareerModel },
                            { model: PeriodModel },
                            { model: CampusModel },
                            { model: BusinessUnitModel },
                            { model: SalePhaseModel },
                            { model: ContactChannelModel },
                        ]
                    })
                    .then(opportunity => opportunity)
                    .catch((_error) => { throw new OpportunityError("Ha ocurrido un error al revisar la oportunidad.") });

            if (!opportunity_exist) throw new OpportunityError(`La oportunidad con ID ${id} no existe.`);

            return OpportunityPresenter(opportunity_exist.dataValues, access, opportunity_exist.dataValues.competitor?.dataValues, opportunity_exist.dataValues.contact?.dataValues, opportunity_exist.dataValues.career?.dataValues, opportunity_exist.dataValues.period?.dataValues, opportunity_exist.dataValues.campus?.dataValues, opportunity_exist.dataValues.business_unit?.dataValues, opportunity_exist.dataValues.sale_phase?.dataValues, opportunity_exist.dataValues.contact_channel?.dataValues, {id: access.user_id, name: access.user_name});
        } catch (error) {
            if (error instanceof Error && error.message) throw new OpportunityError(error.message);
            else throw new Error("Ha ocurrido un error al buscar la oportunidad.");
        }
    }
    async findAll(access: IAccessPermission, page: number): Promise<{ opportunities: {}[], total_opportunity: number, total_pages: number, current_page: number}> {
        try {
            const opportunities = access.super_admin === true ?
                await OpportunityModel.findAndCountAll({
                        include: [
                            { model: CollegeModel, as: "competitor" },
                            { model: ContactModel },
                            { model: CareerModel },
                            { model: PeriodModel },
                            { model: CampusModel },
                            { model: BusinessUnitModel },
                            { model: SalePhaseModel },
                            { model: ContactChannelModel },
                        ],
                        limit: 100,
                        offset: (page - 1) * 100,
                    })
                    .then(opportunities => opportunities)
                    .catch((_error) => { throw new OpportunityError("Ha ocurrido un error al revisar las oportunidades.") }) :
                await OpportunityModel.findAndCountAll({ 
                        where: [
                            { user_id: access.user_id },
                            ListCondition(access)
                        ],
                        include: [
                            { model: CollegeModel, as: "competitor" },
                            { model: ContactModel },
                            { model: CareerModel },
                            { model: PeriodModel },
                            { model: CampusModel },
                            { model: BusinessUnitModel },
                            { model: SalePhaseModel },
                            { model: ContactChannelModel },
                        ],
                        limit: 100,
                        offset: (page - 1) * 100,
                    })
                    .then(opportunities => opportunities)
                    .catch((_error) => { throw new OpportunityError("Ha ocurrido un error al revisar las oportunidades.") });

            return {
                opportunities: opportunities.rows.map(opportunity => OpportunityPresenter(opportunity.dataValues, access, opportunity.dataValues.competitor?.dataValues, opportunity.dataValues.contact?.dataValues, opportunity.dataValues.career?.dataValues, opportunity.dataValues.period?.dataValues, opportunity.dataValues.campus?.dataValues, opportunity.dataValues.business_unit?.dataValues, opportunity.dataValues.sale_phase?.dataValues, opportunity.dataValues.contact_channel?.dataValues, {id: access.user_id, name: access.user_name})),
                total_opportunity: opportunities.count,
                total_pages: Math.ceil(opportunities.count / 10),
                current_page: page,
            };
        } catch (error) {
            if (error instanceof Error && error.message) throw new OpportunityError(error.message);
            else throw new Error("Ha ocurrido un error al listar las oportunidades.");
        }
    }
}
const opportunityDao = new OpportunityDao();
export default opportunityDao;