import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { ContactChannelDetailRepositoryImpl } from "../../infrastructure/contact-channel-detail/contact-channel-detail.repository.impl";
import { ContactChannelDetailCrudUseCase } from "./use-cases/contact-channel-detail-crud.usecase";
import { ContactChannelDetailController } from "./contact-channel-detail.controller";

const contactChannelDetailRouter = Router();
const contactChannelDetailRepository = new ContactChannelDetailRepositoryImpl();
const contactChannelDetailCrudUseCase = new ContactChannelDetailCrudUseCase(contactChannelDetailRepository);
const contactChannelDetailController = new ContactChannelDetailController(contactChannelDetailCrudUseCase);

contactChannelDetailRouter.post("/v1/contact-channel-detail", Access.canCreate('contact-channel-detail'), contactChannelDetailController.create.bind(contactChannelDetailController));
contactChannelDetailRouter.put("/v1/contact-channel-detail/:id", Access.canUpdate('contact-channel-detail'), contactChannelDetailController.update.bind(contactChannelDetailController));
contactChannelDetailRouter.delete("/v1/contact-channel-detail/:id", Access.canDelete('contact-channel-detail'), contactChannelDetailController.delete.bind(contactChannelDetailController));
contactChannelDetailRouter.get("/v1/contact-channel-detail/:contact_channel_id", Access.canRead('contact-channel-detail'), contactChannelDetailController.findByContactChannelId.bind(contactChannelDetailController));
export default contactChannelDetailRouter;