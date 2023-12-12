import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { EventControlRepositoryImpl } from "../../infrastructure/event-control/event-control.repository.impl";
import { EventControlCrudUseCase } from "./use-cases/event-control-crud.usecase";
import { EventControlController } from "./event-control.controller";

const eventControlRouter = Router();
const eventControlRepository = new EventControlRepositoryImpl();
const eventControlCrudUseCase = new EventControlCrudUseCase(eventControlRepository);
const eventControlController = new EventControlController(eventControlCrudUseCase);

eventControlRouter.post("/v1/event-control", Access.canCreate(['event-control']), eventControlController.create.bind(eventControlController));
eventControlRouter.put("/v1/event-control/:id", Access.canUpdate(['event-control']), eventControlController.update.bind(eventControlController));
eventControlRouter.delete("/v1/event-control/:id", Access.canDelete(['event-control']), eventControlController.delete.bind(eventControlController));
eventControlRouter.get("/v1/event-control/:id", Access.canRead(['event-control']), eventControlController.findById.bind(eventControlController));
eventControlRouter.get("/v1/event-controls", Access.canRead(['event-control']), eventControlController.findAll.bind(eventControlController));
export default eventControlRouter;