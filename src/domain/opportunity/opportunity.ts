import { IOpportunity } from "./opportunity.type";

export class Opportunity {
    id: string;
    reserved_enrollment: number;
    reserved_period: number;
    postulation_type: string;
    postulation_date: number;
    tentative_enrollment_date: number;
    termination_motive: number;
    competitor: string;
    migration_code: string;
    last_interaction: string;
    interest_level: number;
    registration_form_date: number;
    purpose_full_interaction: number;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    contact_id: string;
    career_id: string;
    period_id: string;
    campus_id: string;
    business_unit_id: string;
    sale_phase_id: string;
    contact_channel_id: string;
    user_id: string | null;
    constructor(opportunity: IOpportunity) {
        this.id = opportunity.id;
        this.reserved_enrollment = opportunity.reserved_enrollment;
        this.reserved_period = opportunity.reserved_period;
        this.postulation_type = opportunity.postulation_type;
        this.postulation_date = opportunity.postulation_date;
        this.tentative_enrollment_date = opportunity.tentative_enrollment_date;
        this.termination_motive = opportunity.termination_motive;
        this.competitor = opportunity.competitor;
        this.migration_code = opportunity.migration_code;
        this.last_interaction = opportunity.last_interaction;
        this.interest_level = opportunity.interest_level;
        this.registration_form_date = opportunity.registration_form_date;
        this.purpose_full_interaction = opportunity.purpose_full_interaction;
        this.hidden = opportunity.hidden;
        this.deleted = opportunity.deleted;
        this.updatedAt = opportunity.updatedAt;
        this.createdAt = opportunity.createdAt;
        this.contact_id = opportunity.contact_id;
        this.career_id = opportunity.career_id;
        this.period_id = opportunity.period_id;
        this.campus_id = opportunity.campus_id;
        this.business_unit_id = opportunity.business_unit_id;
        this.sale_phase_id = opportunity.sale_phase_id;
        this.contact_channel_id = opportunity.contact_channel_id;
        this.user_id = opportunity.user_id;
    }
}