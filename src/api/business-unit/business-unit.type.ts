export interface CreateBusinessUnitInterface {
    name: string;
    nickname: string;
    code: string;
}

export interface UpdateBusinessUnitInterface extends CreateBusinessUnitInterface {}

export interface BusinessUnitInterface extends CreateBusinessUnitInterface {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}