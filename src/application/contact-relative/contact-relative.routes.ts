import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { ContactRelativeRepositoryImpl } from "../../infrastructure/contact-relative/contact-relative.repository.impl";
import { ContactRelativeCrudUseCase } from "./use-cases/contact-relative-crud.usecase";
import { ContactRelativeController } from "./contact-relative.controller";

const contactRelativeRouter = Router();
const contactRelativeRepository = new ContactRelativeRepositoryImpl();
const contactRelativeCrudUseCase = new ContactRelativeCrudUseCase(contactRelativeRepository);
const contactRelativeController = new ContactRelativeController(contactRelativeCrudUseCase);

contactRelativeRouter.post("/v1/contact-relative", Access.canCreate('contact'), contactRelativeController.create.bind(contactRelativeController));
contactRelativeRouter.put("/v1/contact-relative/:id", Access.canUpdate('contact'), contactRelativeController.update.bind(contactRelativeController));
contactRelativeRouter.delete("/v1/contact-relative/:id", Access.canDelete('contact'), contactRelativeController.delete.bind(contactRelativeController));
contactRelativeRouter.get("/v1/contact-relative/:contact_channel_id", Access.canRead('contact'), contactRelativeController.findByContactId.bind(contactRelativeController));
export default contactRelativeRouter;