import { IAccessPermission } from "../../domain/auth/access.type";
import { ISalePhase } from "../../domain/sale-phase/sale-phase.type";

export interface ISalePhaseResponse {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted?: boolean;
    updatedAt: number;
    createdAt: number;
}

export function SalePhasePresenter(sale_phase: ISalePhase, access: IAccessPermission): ISalePhaseResponse {
    return {
        id: sale_phase.id,
        name: sale_phase.name,
        code: sale_phase.code,
        hidden: sale_phase.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: sale_phase.deleted }),
        updatedAt: sale_phase.updatedAt,
        createdAt: sale_phase.createdAt,
    }
}