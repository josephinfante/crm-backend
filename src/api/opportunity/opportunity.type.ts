export interface CreateOpportunityInterface {
    contact_id: string;
    career_id: string;
    semester_id: string;
}

export interface UpdateOpportunityInterface extends CreateOpportunityInterface {}

export interface OpportunityInterface extends CreateOpportunityInterface{
    id: string;
    createdAt: Date;
    updatedAt: Date;
}