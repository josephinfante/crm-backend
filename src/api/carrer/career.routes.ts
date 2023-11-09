import { Router } from "express";
import { createCareer, deleteCareer, getAllCareers, getCareer, updateCareer } from "./career.controller";

export const careerRouter = Router();

careerRouter.post("/v1/career", createCareer);
careerRouter.get("/v1/career/:id", getCareer);
careerRouter.put("/v1/career/:id", updateCareer);
careerRouter.delete("/v1/career/:id", deleteCareer);
careerRouter.get("/v1/careers", getAllCareers);