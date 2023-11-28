export interface ICreateContactDegree {
    degree_specification_id: string;
    contact_id: string;
    college_id: string;
    graduation_date: Date;
}

export interface IUpdateContactDegree extends ICreateContactDegree {
    hidden: boolean;
}

export interface IContactDegree extends ICreateContactDegree {
    id: string;
    hidden: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
}