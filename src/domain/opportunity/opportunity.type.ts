export interface ICreateOpportunity {
    reserved_enrollment: number,
    reserved_period: number,
    postulation_type: string,
    postulation_date: number,
    tentative_enrollment_date: number,
    termination_motive: number,
    migration_code: string,
    last_interaction: string,
    interest_level: number,
    registration_form_date: number,
    purpose_full_interaction: number,
    competitor_id: string,
    contact_id: string,
    career_id: string,
    period_id: string,
    campus_id: string,
    business_unit_id: string,
    sale_phase_id: string,
    contact_channel_id: string,
}

export interface IUpdateOpportunity extends ICreateOpportunity {
    hidden: boolean,
}

export interface IOpportunity extends ICreateOpportunity {
    id: string,
    hidden: boolean,
    deleted: boolean,
    updatedAt: number,
    createdAt: number,
    user_id: string | null,
}