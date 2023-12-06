import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { OpportunityRepositoryImpl } from "../../infrastructure/opportunity/opportunity.repository.impl";
import { OpportunityCrudUseCase } from "./use-cases/opportunity-crud.usecase";
import { OpportunityController } from "./opportunity.controller";

const opportunityRouter = Router();
const opportunityRepository = new OpportunityRepositoryImpl();
const opportunityCrudUseCase = new OpportunityCrudUseCase(opportunityRepository);
const opportunityController = new OpportunityController(opportunityCrudUseCase);

opportunityRouter.post("/v1/opportunity", Access.canCreate('opportunity'), opportunityController.create.bind(opportunityController));
opportunityRouter.put("/v1/opportunity/:id", Access.canUpdate('opportunity'), opportunityController.update.bind(opportunityController));
opportunityRouter.delete("/v1/opportunity/:id", Access.canDelete('opportunity'), opportunityController.delete.bind(opportunityController));
opportunityRouter.get("/v1/opportunity/:id", Access.canRead('opportunity'), opportunityController.findById.bind(opportunityController));
opportunityRouter.get("/v1/opportunities", Access.canRead('opportunity'), opportunityController.findAll.bind(opportunityController));
export default opportunityRouter;