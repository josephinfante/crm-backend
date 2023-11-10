export interface CreateContactInterface {
    first_name: string;
    last_name_1: string;
    last_name_2: string;
    email: string;
    document_type: string;
    document_number: string;
    phone_number: number;
    facebook_id?: string;
    instagram_id?: string;
}

export interface UpdateContactInterface extends CreateContactInterface {}

export interface ContactInterface extends CreateContactInterface {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}