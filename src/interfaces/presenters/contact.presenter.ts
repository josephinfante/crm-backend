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
    first_name: string;
    last_name_1: string;
    last_name_2: string;
    mobile_number: number;
    phone_number: number;
    document_type: string;
    document_number: string;
    code: string;
    email_1: string;
    email_2: string;
    civil_status: string;
    gender: string;
    graduation_date: Date;
    whatsapp_number: number;
    facebook_id: string;
    instagram_id: string;
    zipcode: string;
    address: string;
    address_reference: string;
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
    accept_policies: boolean;
    accept_marketing: boolean;
    college: {
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
    degree_specification: {
        id: string;
        name: string;
        code: string;
        hidden: boolean;
        deleted: boolean;
        updatedAt: number;
        createdAt: number;
        degree_id: string;
    };
    ethnicity: {
        id: string;
        name: string;
        code: string;
        hidden: boolean;
        deleted: boolean;
        updatedAt: number;
        createdAt: number;
    };
    nationality: {
        id: string;
        name: string;
        code: string;
        hidden: boolean;
        deleted: boolean;
        updatedAt: number;
        createdAt: number;
    };
    country: {
        id: string;
        name: string;
        code: string;
        hidden: boolean;
        deleted: boolean;
        updatedAt: number;
        createdAt: number;
    };
    district: {
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
    first_name: contact.first_name || "",
    last_name_1: contact.last_name_1 || "",
    last_name_2: contact.last_name_2 || "",
    mobile_number: contact.mobile_number || 0,
    phone_number: contact.phone_number || 0,
    document_type: contact.document_type || "",
    document_number: contact.document_number || "",
    code: contact.code || "",
    email_1: contact.email_1 || "",
    email_2: contact.email_2 || "",
    civil_status: contact.civil_status || "",
    gender: contact.gender || "",
    graduation_date: contact.graduation_date || new Date(),
    whatsapp_number: contact.whatsapp_number || 0,
    facebook_id: contact.facebook_id || "",
    instagram_id: contact.instagram_id || "",
    zipcode: contact.zipcode || "",
    address: contact.address || "",
    address_reference: contact.address_reference || "",
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
    accept_policies: contact.accept_policies || false,
    accept_marketing: contact.accept_marketing || false,
    college: {
        id: college?.id || "",
        name: college?.name || "",
        code: college?.code || "",
        type: college?.type || "",
        class: college?.class || "",
        level: college?.level || "",
        board: college?.board || "",
        is_competitor: college?.is_competitor || false,
        priority: college?.priority || 0,
        hidden: college?.hidden || false,
        deleted: college?.deleted || false,
        updatedAt: college?.updatedAt || 0,
        createdAt: college?.createdAt || 0,
    },
    degree_specification: {
        id: degree_specification?.id || "",
        name: degree_specification?.name || "",
        code: degree_specification?.code || "",
        hidden: degree_specification?.hidden || false,
        deleted: degree_specification?.deleted || false,
        updatedAt: degree_specification?.updatedAt || 0,
        createdAt: degree_specification?.createdAt || 0,
        degree_id: degree_specification?.degree_id || "",
    },
    ethnicity: {
        id: ethnicity?.id || "",
        name: ethnicity?.name || "",
        code: ethnicity?.code || "",
        hidden: ethnicity?.hidden || false,
        deleted: ethnicity?.deleted || false,
        updatedAt: ethnicity?.updatedAt || 0,
        createdAt: ethnicity?.createdAt || 0,
    },
    nationality: {
        id: nationality?.id || "",
        name: nationality?.name || "",
        code: nationality?.code || "",
        hidden: nationality?.hidden || false,
        deleted: nationality?.deleted || false,
        updatedAt: nationality?.updatedAt || 0,
        createdAt: nationality?.createdAt || 0,
    },
    country: {
        id: country?.id || "",
        name: country?.name || "",
        code: country?.code || "",
        hidden: country?.hidden || false,
        deleted: country?.deleted || false,
        updatedAt: country?.updatedAt || 0,
        createdAt: country?.createdAt || 0,
    },
    district: {
        id: district?.id || "",
        name: district?.name || "",
        code: district?.code || "",
        hidden: district?.hidden || false,
        deleted: district?.deleted || false,
        updatedAt: district?.updatedAt || 0,
        createdAt: district?.createdAt || 0,
        city_id: district?.city_id || "",
    },
    hidden: contact.hidden,
    ...((access?.super_admin || access?.permission.read_deleted) && { deleted: contact.deleted }),
    createdAt: contact.createdAt,
    updatedAt: contact.updatedAt,
 }
}