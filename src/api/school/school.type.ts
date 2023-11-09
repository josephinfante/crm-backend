export interface CreateSchoolInterface {
    name: string,
    nickname: string,
    code: string,
    business_unit: string
}

export interface UpdateSchoolInterface extends CreateSchoolInterface {}

export interface SchoolInterface extends CreateSchoolInterface {
    id: string,
    name: string,
    nickname: string,
    code: string,
    business_unit_id: string,
    updatedAt: Date,
    createdAt: Date,
}