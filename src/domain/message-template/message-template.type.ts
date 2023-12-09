export interface ICreateMessageTemplate {
    name: string,
    subject: string,
    body: string,
    cco: string,
    type: string,
    business_unit_id: string | null,
    contact_channel_id: string | null,
    sale_phase_id: string | null,
    campus_id: string | null,
    career_id: string | null,
    event_id: string | null,
}

export interface IUpdateMessageTemplate extends ICreateMessageTemplate {
    hidden: boolean,
    deleted: boolean,
}

export interface IMessageTemplate extends ICreateMessageTemplate {
    id: string,
    hidden: boolean,
    deleted: boolean,
    updatedAt: number,
    createdAt: number,
    user_id: string | null,
}