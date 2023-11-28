export interface ICreateEthnicity {
    name: string;
    code: string;
}

export interface UpdateEthnicityInterface extends ICreateEthnicity {
    hidden: boolean;
}

export interface IEthnicity extends ICreateEthnicity {
    id: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
}