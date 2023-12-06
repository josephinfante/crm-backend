export interface IcreateContactChannel {
    name: string,
    code: string,
    automatic_assignment: boolean,
    manual_assignment: boolean,
    send_email: boolean,
    send_sms: boolean,
    send_note: boolean,
    expire_days: number,
}

export interface IupdateContactChannel extends IcreateContactChannel {}

export interface IcontactChannel extends IcreateContactChannel {
    id: string,
    hidden: boolean,
    deleted: boolean,
    updatedAt: number,
    createdAt: number,
    user_id: string | null,
}