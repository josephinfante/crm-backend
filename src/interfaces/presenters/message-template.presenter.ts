import { IAccessPermission } from "../../domain/auth/access.type";
import { ICampus } from "../../domain/campus/campus.type";
import { ICareer } from "../../domain/career/career.type";
import { IcontactChannel } from "../../domain/contact-channel/contact-channel.type";
import { IEvent } from "../../domain/event/event.type";
import { IMessageTemplate } from "../../domain/message-template/message-template.type";
import { ISalePhase } from "../../domain/sale-phase/sale-phase.type";
export interface IMessageTemplateResponse {
    id: string;
    name: string;
    subject: string;
    body: string;
    cco: string;
    type: string;
    hidden: boolean;
    deleted?: boolean;
    updatedAt: number;
    createdAt: number;
    business_unit: {
        id: string;
        name: string;
    } | null
    contact_channel: {
        id: string;
        name: string;
    } | null;
    sale_phase: {
        id: string;
        name: string;
    } | null;
    campus: {
        id: string;
        name: string;
    } | null;
    career: {
        id: string;
        name: string;
    } | null;
    event: {
        id: string;
        name: string;
    } | null;
    // user_id: string;
}

export function MessageTemplatePresenter(message_template: IMessageTemplate, access: IAccessPermission, business_unit?: IMessageTemplate, contact_channel?: IcontactChannel, sale_phase?: ISalePhase, campus?: ICampus, career?: ICareer, event?: IEvent): IMessageTemplateResponse {
    return {
        id: message_template.id,
        name: message_template.name,
        subject: message_template.subject,
        body: message_template.body,
        cco: message_template.cco,
        type: message_template.type,
        hidden: message_template.hidden,
        updatedAt: message_template.updatedAt,
        createdAt: message_template.createdAt,
        business_unit: business_unit ?{
            id: business_unit.id,
            name: business_unit.name,
        }: null,
        contact_channel: contact_channel ?{
            id: contact_channel.id,
            name: contact_channel.name,
        }: null,
        sale_phase: sale_phase ?{
            id: sale_phase.id,
            name: sale_phase.name,
        }: null,
        campus: campus ?{
            id: campus.id,
            name: campus.name,
        }: null,
        career: career ?{
            id: career.id,
            name: career.name,
        }: null,
        event: event ?{
            id: event.id,
            name: event.name,
        }: null,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: message_template.deleted }),
    }
}