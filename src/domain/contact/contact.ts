import { IContact } from "./contact.type";

export class Contact {
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
    native_language?: string | null;
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

    constructor(contact: IContact) {
        this.id = contact.id;
        this.first_name = contact.first_name;
        this.last_name_1 = contact.last_name_1;
        this.last_name_2 = contact.last_name_2;
        this.mobile_number = contact.mobile_number;
        this.phone_number = contact.phone_number;
        this.document_type = contact.document_type;
        this.document_number = contact.document_number;
        this.code = contact.code;
        this.email_1 = contact.email_1;
        this.email_2 = contact.email_2;
        this.civil_status = contact.civil_status;
        this.gender = contact.gender;
        this.graduation_date = contact.graduation_date;
        this.whatsapp_number = contact.whatsapp_number;
        this.facebook_id = contact.facebook_id;
        this.instagram_id = contact.instagram_id;
        this.zipcode = contact.zipcode;
        this.address = contact.address;
        this.address_reference = contact.address_reference;
        this.accept_policies = contact.accept_policies;
        this.accept_marketing = contact.accept_marketing;
        this.college_id = contact.college_id;
        this.degree_specification_id = contact.degree_specification_id;
        this.ethnicity_id = contact.ethnicity_id;
        this.nationality_id = contact.nationality_id;
        this.country_id = contact.country_id;
        this.district_id = contact.district_id;
        this.hidden = contact.hidden;
        this.deleted = contact.deleted;
        this.createdAt = contact.createdAt;
        this.updatedAt = contact.updatedAt;
        this.user_id = contact.user_id;
    }
}