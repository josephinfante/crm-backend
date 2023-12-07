import { IOpportunityResponse } from "../../interfaces/presenters/opportunity.presenter";
import { IAccessPermission } from "../auth/access.type";
import { Opportunity } from "./opportunity";

export interface OpportunityRepository {
    create(access: IAccessPermission, opportunity: Opportunity): Promise<IOpportunityResponse>;
    update(access: IAccessPermission, id: string, opportunity: Opportunity): Promise<IOpportunityResponse>;
    delete(access: IAccessPermission, id: string): Promise<string | void>;
    findById(access: IAccessPermission, id: string): Promise<IOpportunityResponse>;
    findAll(access: IAccessPermission, page: number): Promise<{ opportunities: {}[], total_opportunity: number, total_pages: number, current_page: number}>;
}