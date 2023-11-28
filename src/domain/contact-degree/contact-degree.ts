import { IContactDegree } from "./contact-degree.type";

export class ContactDegree {
    id: string;
    degree_specification_id: string;
    contact_id: string;
    college_id: string;
    graduation_date: Date;
    hidden: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string | null;
    constructor(contactDegree: IContactDegree) {
        this.id = contactDegree.id;
        this.degree_specification_id = contactDegree.degree_specification_id;
        this.contact_id = contactDegree.contact_id;
        this.college_id = contactDegree.college_id;
        this.graduation_date = contactDegree.graduation_date;
        this.hidden = contactDegree.hidden;
        this.updatedAt = contactDegree.updatedAt;
        this.createdAt = contactDegree.createdAt;
        this.user_id = contactDegree.user_id;
    }
}