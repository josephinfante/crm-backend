import { IAccessPermission } from "../../../domain/auth/access.type";
import { MessageTemplate } from "../../../domain/message-template/message-template";
import { MessageTemplateRepository } from "../../../domain/message-template/message-template.repository";
import { IMessageTemplateResponse } from "../../../interfaces/presenters/message-template.presenter";

export class MessageTemplateCrudUseCase {
    constructor(private readonly messageTemplateRepository: MessageTemplateRepository) { }
    async create(access: IAccessPermission, message_template: MessageTemplate): Promise<IMessageTemplateResponse> {
        return this.messageTemplateRepository.create(access, message_template);
    }
    async update(access: IAccessPermission, id: string, message_template: MessageTemplate): Promise<IMessageTemplateResponse> {
        return this.messageTemplateRepository.update(access, id, message_template);
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        return this.messageTemplateRepository.delete(access, id);
    }
    async findById(access: IAccessPermission, id: string): Promise<IMessageTemplateResponse> {
        return this.messageTemplateRepository.findById(access, id);
    }
}