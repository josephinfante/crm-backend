import { IAccessPermission } from "../../domain/auth/access.type";
import { ICollege } from "../../domain/college/college.type";
import { IContact } from "../../domain/contact/contact.type";
import { ICountry } from "../../domain/country/country.type";
import { IDegreeSpecification } from "../../domain/degree-specification/degree-specification.type";
import { IDistrict } from "../../domain/district/district.type";
import { IEthnicity } from "../../domain/ethnicity/ethnicity.type";
import { INationality } from "../../domain/nationality/nationality.type";
import { IContactLanguageResponse } from "./contact-language.presenter";

export interface IContactResponse {
    id: string;
    first_name: string | null;
    last_name_1: string | null;
    last_name_2: string | null;
    mobile_number: string | null;
    phone_number: string | null;
    document_type: string | null;
    document_number: string | null;
    code: string | null;
    email_1: string | null;
    email_2: string | null;
    civil_status: string | null;
    gender: string | null;
    graduation_date: number | null;
    whatsapp_number: number | null;
    facebook_id: string | null;
    instagram_id: string | null;
    zipcode: string | null;
    address: string | null;
    address_reference: string | null;
    languages?: {
        id: string,
        native: string,
        level: string,
        read: string,
        speak: string,
        listen: string,
        hidden: boolean,
        deleted: boolean,
        updatedAt: number,
        createdAt: number,
        language: {
            id: string,
            name: string,
        }
    }[];
    accept_policies: boolean | null;
    accept_marketing: boolean | null;
    college?: {
        id: string;
        name: string;
        code: string;
        type: string;
        class: string;
        level: string;
        board: string;
        is_competitor: boolean;
        priority: number;
        hidden: boolean;
        deleted: boolean;
        updatedAt: number;
        createdAt: number;
    }
    degree_specification?: {
        id: string;
        name: string;
        code: string;
        hidden: boolean;
        deleted: boolean;
        updatedAt: number;
        createdAt: number;
        degree_id: string;
    };
    ethnicity?: {
        id: string;
        name: string;
        code: string;
        hidden: boolean;
        deleted: boolean;
        updatedAt: number;
        createdAt: number;
    };
    nationality?: {
        id: string;
        name: string;
        code: string;
        hidden: boolean;
        deleted: boolean;
        updatedAt: number;
        createdAt: number;
    };
    country?: {
        id: string;
        name: string;
        code: string;
        hidden: boolean;
        deleted: boolean;
        updatedAt: number;
        createdAt: number;
    };
    district?: {
        id: string;
        name: string;
        code: string;
        hidden: boolean;
        deleted: boolean;
        updatedAt: number;
        createdAt: number;
        city_id: string;
    };
    hidden: boolean;
    deleted?: boolean;
    createdAt: number;
    updatedAt: number;
}

export function ContactPresenter(contact: IContact, access: IAccessPermission, contact_languages?: IContactLanguageResponse[], college?: ICollege, degree_specification?: IDegreeSpecification, ethnicity?: IEthnicity, nationality?: INationality, country?: ICountry, district?: IDistrict): IContactResponse {
 return {
    id: contact.id,
    first_name: contact.first_name ?? null,
    last_name_1: contact.last_name_1 ?? null,
    last_name_2: contact.last_name_2 ?? null,
    mobile_number: contact.mobile_number ?? null,
    phone_number: contact.phone_number ?? null,
    document_type: contact.document_type ?? null,
    document_number: contact.document_number ?? null,
    code: contact.code ?? null,
    email_1: contact.email_1 ?? null,
    email_2: contact.email_2 ?? null,
    civil_status: contact.civil_status ?? null,
    gender: contact.gender ?? null,
    graduation_date: contact.graduation_date ?? null,
    whatsapp_number: contact.whatsapp_number ?? null,
    facebook_id: contact.facebook_id ?? null,
    instagram_id: contact.instagram_id ?? null,
    zipcode: contact.zipcode ?? null,
    address: contact.address ?? null,
    address_reference: contact.address_reference ?? null,
    languages: contact_languages?.map(language => ({
        id: language.id,
        native: language.native ? "Sí" : "No",
        level: language.level,
        read: language.read,
        speak: language.speak,
        listen: language.listen,
        hidden: language.hidden,
        deleted: language.deleted,
        updatedAt: language.updatedAt,
        createdAt: language.createdAt,
        language: {
            id: language.language.id,
            name: language.language.name,
        }
    })),
    accept_policies: contact.accept_policies ?? null,
    accept_marketing: contact.accept_marketing ?? null,
    college: college && {
        id: college.id,
        name: college.name,
        code: college.code,
        type: college.type,
        class: college.class,
        level: college.level,
        board: college.board,
        is_competitor: college.is_competitor,
        priority: college.priority,
        hidden: college.hidden,
        deleted: college.deleted,
        updatedAt: college.updatedAt,
        createdAt: college.createdAt,
    },
    degree_specification: degree_specification && {
        id: degree_specification.id,
        name: degree_specification.name,
        code: degree_specification.code,
        hidden: degree_specification.hidden,
        deleted: degree_specification.deleted,
        updatedAt: degree_specification.updatedAt,
        createdAt: degree_specification.createdAt,
        degree_id: degree_specification.degree_id,
    },
    ethnicity: ethnicity && {
        id: ethnicity.id,
        name: ethnicity.name,
        code: ethnicity.code,
        hidden: ethnicity.hidden,
        deleted: ethnicity.deleted,
        updatedAt: ethnicity.updatedAt,
        createdAt: ethnicity.createdAt,
    },
    nationality: nationality && {
        id: nationality.id,
        name: nationality.name,
        code: nationality.code,
        hidden: nationality.hidden,
        deleted: nationality.deleted,
        updatedAt: nationality.updatedAt,
        createdAt: nationality.createdAt,
    },
    country: country && {
        id: country.id,
        name: country.name,
        code: country.code,
        hidden: country.hidden,
        deleted: country.deleted,
        updatedAt: country.updatedAt,
        createdAt: country.createdAt,
    },
    district: district && {
        id: district.id,
        name: district.name,
        code: district.code,
        hidden: district.hidden,
        deleted: district.deleted,
        updatedAt: district.updatedAt,
        createdAt: district.createdAt,
        city_id: district.city_id,
    },
    hidden: contact.hidden,
    ...((access?.super_admin || access?.permission.read_deleted) && { deleted: contact.deleted }),
    createdAt: contact.createdAt,
    updatedAt: contact.updatedAt,
 }
}