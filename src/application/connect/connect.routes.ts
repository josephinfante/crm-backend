import { Router } from "express";
import { ConnectController } from "./connect.controller";
import { ConnectRepositoryImpl } from "../../infrastructure/connect/connect.repository.impl";
import { ConnectWebhookUseCase } from "./use-cases/connect-webhook.usecase";

const connectRouter = Router();
const connectRepository = new ConnectRepositoryImpl();
const connectWebhookUseCase = new ConnectWebhookUseCase(connectRepository);
const connectController = new ConnectController(connectWebhookUseCase);

connectRouter.post("/v1/connect/webhook", connectController.webhook.bind(connectController));
export default connectRouter;