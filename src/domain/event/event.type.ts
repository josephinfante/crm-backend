export interface ICreateEvent {
    name: string;
    code: string;
    type: string;
    address: string;
    campaign_start_date: number;
    start_date: number;
    end_date: number;
    waiting_time: number;
    send_sms: boolean;
    send_email: boolean;
    registration_from_expected: number;
    registration_from_delivered: number;
    registration_from_completed: number;
    registration_from_incompleted: number;
    virtual: boolean;
    pre_inscription_url: string;
    post_event_url: string;
    meeting_url: string;
    survery_url: string;
    send_survey: boolean;
    sent_pre_inscription: boolean;
    inscription_type: string;
    campus_id: string;
    college_id: string;
}

export interface IUpdateEvent extends ICreateEvent {
    hidden: boolean;
}

export interface IEvent extends ICreateEvent {
    id: string;
    hidden: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
    user_id: string | null;
}