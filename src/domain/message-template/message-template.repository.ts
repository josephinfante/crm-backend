import { IMessageTemplateResponse } from "../../interfaces/presenters/message-template.presenter";
import { IAccessPermission } from "../auth/access.type";
import { MessageTemplate } from "./message-template";

export interface MessageTemplateRepository {
    create(access: IAccessPermission, message_template: MessageTemplate):any;
    update(access: IAccessPermission, id: string, message_template: MessageTemplate): Promise<IMessageTemplateResponse>;
    delete(access: IAccessPermission, id: string): Promise<string | void>;
    findById(access: IAccessPermission, id: string): Promise<IMessageTemplateResponse>;
    findAll(access: IAccessPermission): Promise<IMessageTemplateResponse[]>;
}