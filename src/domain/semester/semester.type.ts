export interface ICreateSemester {
    name: string,
    nickname: string,
    code: string,
    business_unit_id: string
}

export interface IUpdateSemester extends ICreateSemester {
    hidden: boolean,
}

export interface ISemester extends ICreateSemester {
    id: string,
    hidden: boolean,
    deleted: boolean,
    updatedAt: number,
    createdAt: number,
    user_id: string | null,
}