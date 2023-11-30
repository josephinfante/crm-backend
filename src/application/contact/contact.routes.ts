import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { ContactRepositoryImpl } from "../../infrastructure/contact/contact.repository.impl";
import { ContactCrudUseCase } from "./use-cases/contact-crud.usecase";
import { ContactController } from "./contact.controller";

const contactRouter = Router();
const contactRepository = new ContactRepositoryImpl();
const contactCrudUseCase = new ContactCrudUseCase(contactRepository);
const contactController = new ContactController(contactCrudUseCase);

contactRouter.post("/v1/contact", Access.canCreate('contact'), contactController.create.bind(contactController));
contactRouter.put("/v1/contact/:id", Access.canUpdate('contact'), contactController.update.bind(contactController));
contactRouter.delete("/v1/contact/:id", Access.canDelete('contact'), contactController.delete.bind(contactController));
contactRouter.get("/v1/contacts", Access.canRead('contact'), contactController.findAll.bind(contactController));
export default contactRouter;