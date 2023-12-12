import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { SalePhaseRepositoryImpl } from "../../infrastructure/sale-phase/sale-phase.repository.impl";
import { SalePhaseCrudUseCase } from "./use-cases/sale-phase-crud.usecase";
import { SalePhaseController } from "./sale-phase.controller";

const salePhaseRouter = Router();
const salePhaseRepository = new SalePhaseRepositoryImpl();
const salePhaseCrudUseCase = new SalePhaseCrudUseCase(salePhaseRepository);
const salePhaseController = new SalePhaseController(salePhaseCrudUseCase);

salePhaseRouter.post("/v1/sale-phase", Access.canCreate(['sale-phase']), salePhaseController.create.bind(salePhaseController));
salePhaseRouter.put("/v1/sale-phase/:id", Access.canUpdate(['sale-phase']), salePhaseController.update.bind(salePhaseController));
salePhaseRouter.delete("/v1/sale-phase/:id", Access.canDelete(['sale-phase']), salePhaseController.delete.bind(salePhaseController));
salePhaseRouter.get("/v1/sale-phases", Access.canRead(['sale-phase']), salePhaseController.findAll.bind(salePhaseController));
export default salePhaseRouter;