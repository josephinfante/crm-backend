export interface ICreateSalePhase {
    name: string;
    code: string;
}

export interface IUpdateSalePhase extends ICreateSalePhase {
    hidden: boolean;
}

export interface ISalePhase extends ICreateSalePhase {
    id: string;
    hidden: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
    user_id: string | null;
}