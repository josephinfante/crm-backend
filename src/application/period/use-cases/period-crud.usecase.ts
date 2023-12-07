import { IAccessPermission } from "../../../domain/auth/access.type";
import { Period } from "../../../domain/period/period";
import { PeriodRepository } from "../../../domain/period/period.repository";
import { IPeriodResponse } from "../../../interfaces/presenters/period.presenter";

export class PeriodCrudUseCase {
    constructor(private readonly periodRepository: PeriodRepository) { }
    async create(access: IAccessPermission, period: Period): Promise<IPeriodResponse> {
        return this.periodRepository.create(access, period);
    }
    async update(access: IAccessPermission, id: string, period: Period): Promise<IPeriodResponse> {
        return this.periodRepository.update(access, id, period);
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        return this.periodRepository.delete(access, id);
    }
    async findByBusinessUnitId(access: IAccessPermission, business_unit_id: string): Promise<IPeriodResponse[]> {
        return this.periodRepository.findByBusinessUnitId(access, business_unit_id);
    }
    async findAll(access: IAccessPermission): Promise<IPeriodResponse[]> {
        return this.periodRepository.findAll(access);
    }
}