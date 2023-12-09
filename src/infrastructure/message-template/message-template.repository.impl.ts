import { IAccessPermission } from "../../domain/auth/access.type";
import { MessageTemplate } from "../../domain/message-template/message-template";
import { MessageTemplateRepository } from "../../domain/message-template/message-template.repository";
import { IMessageTemplateResponse } from "../../interfaces/presenters/message-template.presenter";
import messageTemplateDao from "./message-template.dao";

export class MessageTemplateRepositoryImpl implements MessageTemplateRepository {
    create(access: IAccessPermission, message_template: MessageTemplate) {
        return messageTemplateDao.create(access, message_template);
    }
    update(access: IAccessPermission, id: string, message_template: MessageTemplate): Promise<IMessageTemplateResponse> {
        return messageTemplateDao.update(access, id, message_template);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return messageTemplateDao.delete(access, id);
    }
    findById(access: IAccessPermission, id: string): Promise<IMessageTemplateResponse> {
        return messageTemplateDao.findById(access, id);
    }
}