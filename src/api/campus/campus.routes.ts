import { Router } from "express";
import { createCampus, deleteCampus, getAllCampuses, getCampus, updateCampus } from "./campus.controller";

export const campusRouter = Router();

campusRouter.post("/v1/campus", createCampus);
campusRouter.get("/v1/campus/:id", getCampus);
campusRouter.put("/v1/campus/:id", updateCampus);
campusRouter.delete("/v1/campus/:id", deleteCampus);
campusRouter.get("/v1/campuses", getAllCampuses);