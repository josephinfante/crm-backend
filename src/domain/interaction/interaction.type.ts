export interface ICreateInteraction {
    email?: string | null;
    phone?: string | null;
    contact_channel_type?: string | null;
    integration_id?: string | null;
    start_interaction_date?: number | null;
    start_hold_date?: number | null;
    end_hold_date?: number | null;
    end_interaction_date?: number | null;
    tracking_date?: number | null;
    next_interaction_date?: number | null;
    viewed?: boolean | null;
    comment?: string | null;
    opportunity_id?: string | null;
    college_id?: string | null;
    contact_channel_id?: string | null;
}

export interface IUpdateInteraction extends ICreateInteraction {
    hidden?: boolean;
}

export interface IInteraction extends ICreateInteraction {
    id: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string;
}