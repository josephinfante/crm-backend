export interface ICreateCountry {
    name: string;
    code: string;
}

export interface IUpdateCountry extends ICreateCountry {
    hidden: boolean;
}

export interface ICountry extends ICreateCountry {
    id: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
}