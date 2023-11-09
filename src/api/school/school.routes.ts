import { Router } from "express";
import { createSchool, deleteSchool, getAllSchools, getSchool, updateSchool } from "./school.controller";

export const schoolRouter = Router();

schoolRouter.post("/v1/school", createSchool);
schoolRouter.get("/v1/school/:id", getSchool);
schoolRouter.put("/v1/school/:id", updateSchool);
schoolRouter.delete("/v1/school/:id", deleteSchool);
schoolRouter.get("/v1/schools", getAllSchools);