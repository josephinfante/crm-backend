export interface ICreateContactChannelDetail {
    name: string;
}

export interface IContactChannelDetail extends ICreateContactChannelDetail{
    id: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    contact_channel_id: string;
    user_id: string | null;
}