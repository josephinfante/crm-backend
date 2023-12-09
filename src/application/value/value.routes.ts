import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { ValueRepositoryImpl } from "../../infrastructure/value/value.repository.impl";
import { ValueCrudUseCase } from "./use-cases/value-crud.usecase";
import { ValueController } from "./value.controller";

const valueRouter = Router();
const valueRepository = new ValueRepositoryImpl();
const valueCrudUseCase = new ValueCrudUseCase(valueRepository);
const valueController = new ValueController(valueCrudUseCase);

valueRouter.post("/v1/value", Access.canCreate('value'), valueController.create.bind(valueController));
valueRouter.put("/v1/value/:id", Access.canUpdate('value'), valueController.update.bind(valueController));
valueRouter.delete("/v1/value/:id", Access.canDelete('value'), valueController.delete.bind(valueController));
valueRouter.get("/v1/value/:id", valueController.findAll.bind(valueController));
export default valueRouter;