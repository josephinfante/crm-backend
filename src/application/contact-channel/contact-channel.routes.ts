import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { ContactChannelRepositoryImpl } from "../../infrastructure/contact-channel/contact-channel.repository.impl";
import { ContactChannelCrudUseCase } from "./use-cases/contact-channel-crud.usecase";
import { ContactChannelController } from "./contact-channel.controller";

const contactChannelRouter = Router();
const contactChannelRepository = new ContactChannelRepositoryImpl();
const contactChannelCrudUseCase = new ContactChannelCrudUseCase(contactChannelRepository);
const contactChannelController = new ContactChannelController(contactChannelCrudUseCase);

contactChannelRouter.post("/v1/contact-channel", Access.canCreate(['contact-channel']), contactChannelController.create.bind(contactChannelController));
contactChannelRouter.put("/v1/contact-channel/:id", Access.canUpdate(['contact-channel']), contactChannelController.update.bind(contactChannelController));
contactChannelRouter.delete("/v1/contact-channel/:id", Access.canDelete(['contact-channel']), contactChannelController.delete.bind(contactChannelController));
contactChannelRouter.get("/v1/contact-channels", Access.canRead(['contact-channel']), contactChannelController.findAll.bind(contactChannelController));
export default contactChannelRouter;