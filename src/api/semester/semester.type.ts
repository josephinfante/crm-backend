export interface CreateSemesterInterface {
    name: string,
    nickname: string,
    code: string,
    business_unit: string
}

export interface UpdateSemesterInterface extends CreateSemesterInterface {}

export interface SemesterInterface extends CreateSemesterInterface {
    id: string,
    name: string,
    nickname: string,
    code: string,
    business_unit_id: string,
    updatedAt: Date,
    createdAt: Date,
}