import { IAccessPermission } from "../../domain/auth/access.type";
import { IContactRelative } from "../../domain/contact-relative/contact-relative.type";
import { IContact } from "../../domain/contact/contact.type";

export interface IContactRelativeResponse {
    id: string;
    relationship: string;
    contact: {
        id: string;
        name: string;
        document_number: string;
    };
    relative: {
        id: string;
        name: string;
        document_number: string;
    };
    deleted?: boolean;
    createdAt: number;
    updatedAt: number;
}

export function ContactRelativePresenter(contact_relative: IContactRelative, access: IAccessPermission, contact: IContact, relative: IContact): IContactRelativeResponse {
    return {
        id: contact_relative.id,
        relationship: contact_relative.relationship,
        contact: {
            id: contact.id,
            name: `${contact?.first_name} ${contact?.last_name_1}`,
            document_number: `${contact?.document_number}`
        },
        relative: {
            id: relative.id,
            name: `${relative?.first_name} ${relative?.last_name_1}`,
            document_number: `${relative?.document_number}`
        },
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: contact_relative.deleted }),
        createdAt: contact_relative.createdAt,
        updatedAt: contact_relative.updatedAt,
    }
}