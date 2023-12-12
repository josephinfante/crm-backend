export interface ICreateValue {
    select_name: string;
    key: string;
    value: string;
}

export interface IValue extends ICreateValue{
    id: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
}