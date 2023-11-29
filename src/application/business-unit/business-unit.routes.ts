import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { BusinessUnitRepositoryImpl } from "../../infrastructure/business-unit/business-unit.repository.impl";
import { BusinessUnitCrudUseCase } from "./use-cases/business-unit-crud.usecase";
import { BusinessUnitController } from "./business-unit.controller";

const businessUnitRouter = Router();
const businessUnitRepository = new BusinessUnitRepositoryImpl();
const businessUnitCrudUseCase = new BusinessUnitCrudUseCase(businessUnitRepository);
const businessUnitController = new BusinessUnitController(businessUnitCrudUseCase);

businessUnitRouter.post("/v1/business-unit", Access.canCreate('business-unit'), businessUnitController.create.bind(businessUnitController));
businessUnitRouter.put("/v1/business-unit/:id", Access.canUpdate('business-unit'), businessUnitController.update.bind(businessUnitController));
businessUnitRouter.delete("/v1/business-unit/:id", Access.canDelete('business-unit'), businessUnitController.delete.bind(businessUnitController));
businessUnitRouter.get("/v1/business-units", Access.canRead('business-unit'), businessUnitController.findAll.bind(businessUnitController));
export default businessUnitRouter;