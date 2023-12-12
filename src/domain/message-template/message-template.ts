import { IMessageTemplate } from "./message-template.type";

export class MessageTemplate {
    id: string;
    name: string;
    subject: string;
    body: string;
    cco: string;
    type: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    business_unit_id: string | null;
    contact_channel_id: string | null;
    sale_phase_id: string | null;
    campus_id: string | null;
    career_id: string | null;
    event_id: string | null;
    user_id: string | null;
    constructor(message_template: IMessageTemplate) {
        this.id = message_template.id;
        this.name = message_template.name;
        this.subject = message_template.subject;
        this.body = message_template.body;
        this.cco = message_template.cco;
        this.type = message_template.type;
        this.hidden = message_template.hidden;
        this.deleted = message_template.deleted;
        this.updatedAt = message_template.updatedAt;
        this.createdAt = message_template.createdAt;
        this.business_unit_id = message_template.business_unit_id;
        this.contact_channel_id = message_template.contact_channel_id;
        this.sale_phase_id = message_template.sale_phase_id;
        this.campus_id = message_template.campus_id;
        this.career_id = message_template.career_id;
        this.event_id = message_template.event_id;
        this.user_id = message_template.user_id;
    }
}