import { IAccessPermission } from "../../domain/auth/access.type";
import { Opportunity } from "../../domain/opportunity/opportunity";
import { OpportunityRepository } from "../../domain/opportunity/opportunity.repository";
import { IOpportunityResponse } from "../../interfaces/presenters/opportunity.presenter";
import opportunityDao from "./opportunity.dao";

export class OpportunityRepositoryImpl implements OpportunityRepository {
    create(access: IAccessPermission, opportunity: Opportunity): Promise<IOpportunityResponse> {
        return opportunityDao.create(access, opportunity);
    }
    update(access: IAccessPermission, id: string, opportunity: Opportunity): Promise<IOpportunityResponse> {
        return opportunityDao.update(access, id, opportunity);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return opportunityDao.delete(access, id);
    }
    findById(access: IAccessPermission, id: string): Promise<IOpportunityResponse> {
        return opportunityDao.findById(access, id);
    }
    findAll(access: IAccessPermission, page: number): Promise<{ opportunities: {}[]; total_opportunity: number; total_pages: number; current_page: number; }> {
        return opportunityDao.findAll(access, page);
    }
}