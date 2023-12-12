import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { EventRepositoryImpl } from "../../infrastructure/event/event.repository.impl";
import { EventCrudUseCase } from "./use-cases/event-crud.usecase";
import { EventController } from "./event.controller";

const eventRouter = Router();
const eventRepository = new EventRepositoryImpl();
const eventCrudUseCase = new EventCrudUseCase(eventRepository);
const eventController = new EventController(eventCrudUseCase);

eventRouter.post("/v1/event", Access.canCreate(['event']), eventController.create.bind(eventController));
eventRouter.put("/v1/event/:id", Access.canUpdate(['event']), eventController.update.bind(eventController));
eventRouter.delete("/v1/event/:id", Access.canDelete(['event']), eventController.delete.bind(eventController));
eventRouter.get("/v1/event/:id", Access.canRead(['event']), eventController.findById.bind(eventController));
eventRouter.get("/v1/events", Access.canRead(['event']), eventController.findAll.bind(eventController));
export default eventRouter;