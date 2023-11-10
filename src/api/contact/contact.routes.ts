import { Router } from "express";
import { createContact, deleteContact, getAllContacts, getContact, updateContact } from "./contact.controller";

export const contactRouter = Router();

contactRouter.post("/v1/contact", createContact);
contactRouter.get("/v1/contact/:id", getContact);
contactRouter.put("/v1/contact/:id", updateContact);
contactRouter.delete("/v1/contact/:id", deleteContact);
contactRouter.get("/v1/contacts", getAllContacts);