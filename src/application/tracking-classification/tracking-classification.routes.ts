import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { TrackingClassificationRepositoryImpl } from "../../infrastructure/tracking-classification/tracking-classification.repository.impl";
import { TrackingClassificationCrudUseCase } from "./use-cases/tracking-classification-crud.usecase";
import { TrackingClassificationController } from "./tracking-classification.controller";

const trackingClassificationRouter = Router();
const trackingClassificationRepository = new TrackingClassificationRepositoryImpl();
const trackingClassificationCrudUseCase = new TrackingClassificationCrudUseCase(trackingClassificationRepository);
const trackingClassificationController = new TrackingClassificationController(trackingClassificationCrudUseCase);

trackingClassificationRouter.post("/v1/tracking-classification", Access.canCreate(['tracking-classification']), trackingClassificationController.create.bind(trackingClassificationController));
trackingClassificationRouter.put("/v1/tracking-classification/:id", Access.canUpdate(['tracking-classification']), trackingClassificationController.update.bind(trackingClassificationController));
trackingClassificationRouter.delete("/v1/tracking-classification/:id", Access.canDelete(['tracking-classification']), trackingClassificationController.delete.bind(trackingClassificationController));
trackingClassificationRouter.get("/v1/tracking-classifications", Access.canRead(['tracking-classification']), trackingClassificationController.findAll.bind(trackingClassificationController));
export default trackingClassificationRouter;