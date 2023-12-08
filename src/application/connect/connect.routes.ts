import { Router } from "express";
import { ConnectController } from "./connect.controller";

const connectRouter = Router();
const connectController = new ConnectController();

connectRouter.post("/v1/connect/webhook", connectController.webhook.bind(connectController));
export default connectRouter;