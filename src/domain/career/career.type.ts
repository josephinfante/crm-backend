export interface ICreateCareer {
    name: string,
    nickname: string,
    code: string,
    school_id: string
}

export interface IUpdateCareer extends ICreateCareer {
    hidden: boolean,
}

export interface ICareer extends ICreateCareer {
    id: string,
    hidden: boolean,
    deleted: boolean,
    updatedAt: number,
    createdAt: number,
    user_id: string | null,
}