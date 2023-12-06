import { IAccessPermission } from "../../../domain/auth/access.type";
import { Opportunity } from "../../../domain/opportunity/opportunity";
import { OpportunityRepository } from "../../../domain/opportunity/opportunity.repository";
import { IOpportunityResponse } from "../../../interfaces/presenters/opportunity.presenter";

export class OpportunityCrudUseCase {
    constructor(private readonly opportunityRepository: OpportunityRepository) {}
    async create(access: IAccessPermission, opportunity: Opportunity): Promise<IOpportunityResponse> {
        return await this.opportunityRepository.create(access, opportunity);
    }
    async update(access: IAccessPermission, id: string, opportunity: Opportunity): Promise<IOpportunityResponse> {
        return await this.opportunityRepository.update(access, id, opportunity);
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        return await this.opportunityRepository.delete(access, id);
    }
    async findById(access: IAccessPermission, id: string): Promise<IOpportunityResponse> {
        return await this.opportunityRepository.findById(access, id);
    }
    async findAll(access: IAccessPermission, page: number): Promise<{ opportunities: {}[], total_opportunity: number, total_pages: number, current_page: number}> {
        return await this.opportunityRepository.findAll(access, page);
    }
}