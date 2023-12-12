import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { MessageTemplateRepositoryImpl } from "../../infrastructure/message-template/message-template.repository.impl";
import { MessageTemplateCrudUseCase } from "./use-cases/message-template-crud.usecase";
import { MessageTemplateController } from "./message-template.controller";

const messageTemplateRouter = Router();
const messageTemplateRepository = new MessageTemplateRepositoryImpl();
const messageTemplateCrudUseCase = new MessageTemplateCrudUseCase(messageTemplateRepository);
const messageTemplateController = new MessageTemplateController(messageTemplateCrudUseCase);

messageTemplateRouter.post("/v1/message-template", Access.canCreate('message-template'), messageTemplateController.create.bind(messageTemplateController));
messageTemplateRouter.put("/v1/message-template/:id", Access.canUpdate('message-template'), messageTemplateController.update.bind(messageTemplateController));
messageTemplateRouter.delete("/v1/message-template/:id", Access.canDelete('message-template'), messageTemplateController.delete.bind(messageTemplateController));
messageTemplateRouter.get("/v1/message-template/:id", Access.canRead('message-template'), messageTemplateController.findById.bind(messageTemplateController));
export default messageTemplateRouter;