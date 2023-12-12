export interface ICreateContact {
    first_name?: string | null;
    last_name_1?: string | null;
    last_name_2?: string | null;
    mobile_number?: string | null;
    phone_number?: string | null;
    document_type?: string | null;
    document_number?: string | null;
    code?: string | null;
    email_1?: string | null;
    email_2?: string | null;
    civil_status?: string | null;
    gender?: string | null;
    graduation_date?: number | null;
    whatsapp_number?: number | null;
    facebook_id?: string | null;
    instagram_id?: string | null;
    address?: string | null;
    address_reference?: string | null;
    accept_policies?: boolean | null;
    accept_marketing?: boolean | null;
    languages?: {
        id: string;
        native: boolean;
        level: string;
        speak: string;
        read: string;
        listen: string;
    }[];
    college_id?: string | null;
    degree_specification_id?: string | null;
    ethnicity_id?: string | null;
    nationality_id?: string | null;
    country_id?: string | null;
    district_id?: string | null;
}

export interface IUpdateContact extends ICreateContact {
    hidden?: boolean;
}

export interface IContact {
    id: string;
    first_name?: string | null;
    last_name_1?: string | null;
    last_name_2?: string | null;
    mobile_number?: string | null;
    phone_number?: string | null;
    document_type?: string | null;
    document_number?: string | null;
    code?: string | null;
    email_1?: string | null;
    email_2?: string | null;
    civil_status?: string | null;
    gender?: string | null;
    graduation_date?: number | null;
    whatsapp_number?: number | null;
    facebook_id?: string | null;
    instagram_id?: string | null;
    zipcode?: string | null;
    address?: string | null;
    address_reference?: string | null;
    accept_policies?: boolean | null;
    accept_marketing?: boolean | null;
    college_id?: string | null;
    degree_specification_id?: string | null;
    ethnicity_id?: string | null;
    nationality_id?: string | null;
    country_id?: string | null;
    district_id?: string | null;
    hidden: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
    user_id: string | null;
}