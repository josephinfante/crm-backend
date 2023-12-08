export interface ICreateEventControl {
    confirmed: boolean;
    attended: boolean;
    will_apply: boolean;
    qr_url: string;
    event_url: string;
    post_event_url: string;
    sent_sms: boolean;
    sent_email: boolean;
    event_id: string;
    contact_id: string;
    opportunity_id: string;
}

export interface IUpdateEventControl extends ICreateEventControl {
    hidden: boolean;
}

export interface IEventControl extends ICreateEventControl {
    id: string;
    hidden: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
    user_id: string | null;
}