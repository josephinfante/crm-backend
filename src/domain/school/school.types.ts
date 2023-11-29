export interface ICreateSchool {
    name: string,
    nickname: string,
    code: string,
    business_unit_id: string
}

export interface IUpdateSchool extends ICreateSchool {
    hidden: boolean,
}

export interface ISchool extends ICreateSchool {
    id: string,
    hidden: boolean,
    deleted: boolean,
    updatedAt: number,
    createdAt: number,
    user_id: string | null,
}