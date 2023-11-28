import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { EthnicityRepositoryImpl } from "../../infrastructure/ethnicity/ethnicity.repository.impl";
import { EthnicityCrudUseCase } from "./use-cases/ethnicity-crud.usecase";
import { EthnicityController } from "./ethnicity.controller";

const ethnicityRouter = Router();
const ethnicityRepository = new EthnicityRepositoryImpl();
const ethnicityCrudUseCase = new EthnicityCrudUseCase(ethnicityRepository);
const ethnicityController = new EthnicityController(ethnicityCrudUseCase);

ethnicityRouter.post("/v1/ethnicity", Access.canCreate('ethnicity'), ethnicityController.create.bind(ethnicityController));
ethnicityRouter.put("/v1/ethnicity/:id", Access.canUpdate('ethnicity'), ethnicityController.update.bind(ethnicityController));
ethnicityRouter.delete("/v1/ethnicity/:id", Access.canDelete('ethnicity'), ethnicityController.delete.bind(ethnicityController));
ethnicityRouter.get("/v1/ethnicities", Access.canRead('ethnicity'), ethnicityController.findAll.bind(ethnicityController));
export default ethnicityRouter;