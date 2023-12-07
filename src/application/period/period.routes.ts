import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { PeriodRepositoryImpl } from "../../infrastructure/period/period.repository.impl";
import { PeriodCrudUseCase } from "./use-cases/period-crud.usecase";
import { PeriodController } from "./period.controller";

const periodRouter = Router();
const periodRepository = new PeriodRepositoryImpl();
const periodCrudUseCase = new PeriodCrudUseCase(periodRepository);
const periodController = new PeriodController(periodCrudUseCase);

periodRouter.post("/v1/period", Access.canCreate('period'), periodController.create.bind(periodController));
periodRouter.put("/v1/period/:id", Access.canUpdate('period'), periodController.update.bind(periodController));
periodRouter.delete("/v1/period/:id", Access.canDelete('period'), periodController.delete.bind(periodController));
periodRouter.get("/v1/periods/:business_unit_id", Access.canRead('period'), periodController.findByBusinessUnitId.bind(periodController));
periodRouter.get("/v1/periods", Access.canRead('period'), periodController.findAll.bind(periodController));
export default periodRouter;