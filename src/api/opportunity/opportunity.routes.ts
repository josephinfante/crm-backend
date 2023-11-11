import { Router } from "express";
import { createOpportunity, deleteOpportunity, getAllOpportunities, getOpportunity, updateOpportunity } from "./opportunity.controller";

export const opportunityRouter = Router();

opportunityRouter.post("/v1/opportunity", createOpportunity);
opportunityRouter.get("/v1/opportunity/:id", getOpportunity);
opportunityRouter.put("/v1/opportunity/:id", updateOpportunity);
opportunityRouter.delete("/v1/opportunity/:id", deleteOpportunity);
opportunityRouter.get("/v1/opportunities", getAllOpportunities);