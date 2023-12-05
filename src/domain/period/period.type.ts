export interface ICreatePeriod {
    name: string,
    nickname: string,
    code: string,
    business_unit_id: string
}

export interface IUpdatePeriod extends ICreatePeriod {
    hidden: boolean,
}

export interface IPeriod extends ICreatePeriod {
    id: string,
    hidden: boolean,
    deleted: boolean,
    updatedAt: number,
    createdAt: number,
    user_id: string | null,
}