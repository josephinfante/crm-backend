import { IAccessPermission } from "../../domain/auth/access.type";
import { SalePhase } from "../../domain/sale-phase/sale-phase";
import { SalePhaseRepository } from "../../domain/sale-phase/sale-phase.repository";
import { ISalePhaseResponse } from "../../interfaces/presenters/sale-phase.presenter";
import salePhaseDao from "./sale-phase.dao";

export class SalePhaseRepositoryImpl implements SalePhaseRepository {
    create(access: IAccessPermission, sale_phase: SalePhase): Promise<ISalePhaseResponse> {
        return salePhaseDao.create(access, sale_phase);
    }
    update(access: IAccessPermission, id: string, sale_phase: SalePhase): Promise<ISalePhaseResponse> {
        return salePhaseDao.update(access, id, sale_phase);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return salePhaseDao.delete(access, id);
    }
    findAll(access: IAccessPermission): Promise<ISalePhaseResponse[]> {
        return salePhaseDao.findAll(access);
    }
}