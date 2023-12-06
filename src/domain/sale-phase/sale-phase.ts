import { ISalePhase } from "./sale-phase.type";

export class SalePhase {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    createdAt: number;
    updatedAt: number;
    user_id: string | null;
    constructor(sale_phase: ISalePhase) {
        this.id = sale_phase.id;
        this.name = sale_phase.name;
        this.code = sale_phase.code;
        this.hidden = sale_phase.hidden;
        this.createdAt = sale_phase.createdAt;
        this.updatedAt = sale_phase.updatedAt;
        this.user_id = sale_phase.user_id;
    }
}