import { Router } from "express";
import { createOpportunity, deleteOpportunity, getAllOpportunities, getOpportunity, updateOpportunity } from "./opportunity.controller";
import { Access } from "../../shared/middlewares";

export const opportunityRouter = Router();

opportunityRouter.post("/v1/opportunity", Access.canCreate('opportunity'), createOpportunity);
opportunityRouter.get("/v1/opportunity/:id", Access.canRead('opportunity'), getOpportunity);
opportunityRouter.put("/v1/opportunity/:id", Access.canUpdate('opportunity'), updateOpportunity);
opportunityRouter.delete("/v1/opportunity/:id", Access.canDelete('opportunity'), deleteOpportunity);
opportunityRouter.get("/v1/opportunities", Access.canRead('opportunity'), getAllOpportunities);