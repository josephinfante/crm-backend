import { IInteraction } from "./interaction.type";

export class Interaction {
    id: string;
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
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    user_id: string;
    constructor(interaction: IInteraction) {
        this.id = interaction.id;
        this.email = interaction.email;
        this.phone = interaction.phone;
        this.contact_channel_type = interaction.contact_channel_type;
        this.integration_id = interaction.integration_id;
        this.start_interaction_date = interaction.start_interaction_date;
        this.start_hold_date = interaction.start_hold_date;
        this.end_hold_date = interaction.end_hold_date;
        this.end_interaction_date = interaction.end_interaction_date;
        this.tracking_date = interaction.tracking_date;
        this.next_interaction_date = interaction.next_interaction_date;
        this.viewed = interaction.viewed;
        this.comment = interaction.comment;
        this.opportunity_id = interaction.opportunity_id;
        this.college_id = interaction.college_id;
        this.contact_channel_id = interaction.contact_channel_id;
        this.hidden = interaction.hidden;
        this.deleted = interaction.deleted;
        this.updatedAt = interaction.updatedAt;
        this.createdAt = interaction.createdAt;
        this.user_id = interaction.user_id;
    }
}