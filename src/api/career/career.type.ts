export interface CreateCareerInterface {
    name: string,
    nickname: string,
    code: string,
    school: string
}

export interface UpdateCareerInterface extends CreateCareerInterface {}

export interface CareerInterface extends CreateCareerInterface {
    id: string,
    name: string,
    nickname: string,
    code: string,
    school_id: string,
    updatedAt: Date,
    createdAt: Date,
}