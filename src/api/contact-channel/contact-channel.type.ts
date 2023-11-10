export interface CreateContactChannelInterface {
    name: string;
    code: string;
    is_automatic: boolean;
    is_manual: boolean;
}

export interface UpdateContactChannelInterface extends CreateContactChannelInterface {}

export interface ContactChannelInterface extends CreateContactChannelInterface {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}