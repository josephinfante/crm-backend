export interface ICreateCampus {
    name: string,
    nickname: string,
    code: string,
    business_unit_id: string
}

export interface IUpdateCampus extends ICreateCampus {
    hidden: boolean,
}

export interface ICampus extends ICreateCampus {
    id: string,
    hidden: boolean,
    deleted: boolean,
    updatedAt: number,
    createdAt: number,
    user_id: string | null,
}