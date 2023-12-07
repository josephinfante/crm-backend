import { ISalePhaseResponse } from "../../interfaces/presenters/sale-phase.presenter";
import { IAccessPermission } from "../auth/access.type";
import { SalePhase } from "./sale-phase";

export interface SalePhaseRepository {
    create(access: IAccessPermission, sale_phase: SalePhase): Promise<ISalePhaseResponse>;
    update(access: IAccessPermission, id: string, sale_phase: SalePhase): Promise<ISalePhaseResponse>;
    delete(access: IAccessPermission, id: string): Promise<void | string>;
    findAll(access: IAccessPermission): Promise<ISalePhaseResponse[]>;
}