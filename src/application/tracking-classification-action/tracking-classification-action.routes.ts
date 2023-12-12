import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { TrackingClassificationActionRepositoryImpl } from "../../infrastructure/tracking-classification-action/tracking-classification-action.repository.impl";
import { TrackingClassificationActionCrudUseCase } from "./use-cases/tracking-classification-action-crud.usecase";
import { TrackingClassificationActionController } from "./tracking-classification-action.controller";

const trackingClassificationActionRouter = Router();
const trackingClassificationActionRepository = new TrackingClassificationActionRepositoryImpl();
const trackingClassificationActionCrudUseCase = new TrackingClassificationActionCrudUseCase(trackingClassificationActionRepository);
const trackingClassificationActionController = new TrackingClassificationActionController(trackingClassificationActionCrudUseCase);

trackingClassificationActionRouter.post("/v1/tracking-classification-action", Access.canCreate(['tracking-classification-action']), trackingClassificationActionController.create.bind(trackingClassificationActionController));
trackingClassificationActionRouter.put("/v1/tracking-classification-action/:id", Access.canUpdate(['tracking-classification-action']), trackingClassificationActionController.update.bind(trackingClassificationActionController));
trackingClassificationActionRouter.delete("/v1/tracking-classification-action/:id", Access.canDelete(['tracking-classification-action']), trackingClassificationActionController.delete.bind(trackingClassificationActionController));
trackingClassificationActionRouter.get("/v1/tracking-classification-action/:tracking_classification_id", Access.canRead(['tracking-classification-action']), trackingClassificationActionController.findByTrackingClassificationId.bind(trackingClassificationActionController));
trackingClassificationActionRouter.get("/v1/tracking-classification-actions", Access.canRead(['tracking-classification-action']), trackingClassificationActionController.findAll.bind(trackingClassificationActionController));
export default trackingClassificationActionRouter;