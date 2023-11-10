export interface CreateCampusInterface {
    name: string,
    nickname: string,
    code: string,
    business_unit: string
}

export interface UpdateCampusInterface extends CreateCampusInterface {}

export interface CampusInterface extends CreateCampusInterface {
    id: string,
    name: string,
    nickname: string,
    code: string,
    business_unit_id: string,
    updatedAt: Date,
    createdAt: Date,
}