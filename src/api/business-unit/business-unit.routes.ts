import { Router } from "express";
import { createBusinessUnit, deleteBusinessUnit, getAllBusinessUnits, getBusinessUnit, updateBusinessUnit } from "./business-unit.controller";

export const businessUnitRouter = Router();

businessUnitRouter.post("/v1/business-unit", createBusinessUnit);
businessUnitRouter.get("/v1/business-unit/:id", getBusinessUnit);
businessUnitRouter.put("/v1/business-unit/:id", updateBusinessUnit);
businessUnitRouter.delete("/v1/business-unit/:id", deleteBusinessUnit);
businessUnitRouter.get("/v1/business-units", getAllBusinessUnits);