import { IAccessPermission } from "../../../domain/auth/access.type";
import { SalePhase } from "../../../domain/sale-phase/sale-phase";
import { SalePhaseRepository } from "../../../domain/sale-phase/sale-phase.repository";
import { ISalePhaseResponse } from "../../../interfaces/presenters/sale-phase.presenter";

export class SalePhaseCrudUseCase {
    constructor(private readonly salePhaseRepository: SalePhaseRepository) {}
    async create(access: IAccessPermission, sale_phase: SalePhase): Promise<ISalePhaseResponse> {
        return await this.salePhaseRepository.create(access, sale_phase);
    }
    async update(access: IAccessPermission, id: string, sale_phase: SalePhase): Promise<ISalePhaseResponse> {
        return await this.salePhaseRepository.update(access, id, sale_phase);
    }
    async delete(access: IAccessPermission, id: string): Promise<void | string> {
        return await this.salePhaseRepository.delete(access, id);
    }
    async findAll(access: IAccessPermission): Promise<ISalePhaseResponse[]> {
        return await this.salePhaseRepository.findAll(access);
    }
}