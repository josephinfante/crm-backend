import { Router } from "express";
import { createContactChannel, deleteContactChannel, getAllContactChannels, getContactChannel, updateContactChannel } from "./contact-channel.controller";

export const contactChannelRouter = Router();

contactChannelRouter.post("/v1/contact-channel", createContactChannel);
contactChannelRouter.get("/v1/contact-channel/:id", getContactChannel);
contactChannelRouter.put("/v1/contact-channel/:id", updateContactChannel);
contactChannelRouter.delete("/v1/contact-channel/:id", deleteContactChannel);
contactChannelRouter.get("/v1/contact-channels", getAllContactChannels);