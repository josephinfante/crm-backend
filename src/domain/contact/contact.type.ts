export interface ICreateContact {
    first_name?: string;
    last_name_1?: string;
    last_name_2?: string;
    mobile_number?: number;
    phone_number?: number;
    document_type?: string;
    document_number?: string;
    code?: string;
    email_1?: string;
    email_2?: string;
    civil_status?: string;
    gender?: string;
    graduation_date?: Date;
    whatsapp_number?: number;
    facebook_id?: string;
    instagram_id?: string;
    address?: string;
    address_reference?: string;
    accept_policies?: boolean;
    accept_marketing?: boolean;
    languages?: {
        id: string;
        native: boolean;
        level: string;
        speak: string;
        read: string;
        listen: string;
    }[];
    college_id?: string;
    degree_specification_id?: string;
    ethnicity_id?: string;
    nationality_id?: string;
    country_id?: string;
    district_id?: string;
}

export interface IUpdateContact extends ICreateContact {
    hidden: boolean;
}

export interface IContact {
    id: string;
    first_name?: string;
    last_name_1?: string;
    last_name_2?: string;
    mobile_number?: number;
    phone_number?: number;
    document_type?: string;
    document_number?: string;
    code?: string;
    email_1?: string;
    email_2?: string;
    civil_status?: string;
    gender?: string;
    graduation_date?: Date;
    whatsapp_number?: number;
    facebook_id?: string;
    instagram_id?: string;
    zipcode?: string;
    address?: string;
    address_reference?: string;
    accept_policies?: boolean;
    accept_marketing?: boolean;
    college_id?: string;
    degree_specification_id?: string;
    ethnicity_id?: string;
    nationality_id?: string;
    country_id?: string;
    district_id?: string;
    hidden: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
    user_id: string | null;
}