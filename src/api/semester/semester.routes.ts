import { Router } from "express";
import { createSemester, deleteSemester, getAllSemesters, getSemester, updateSemester } from "./semester.controller";

export const semesterRouter = Router();

semesterRouter.post("/v1/semester", createSemester);
semesterRouter.get("/v1/semester/:id", getSemester);
semesterRouter.put("/v1/semester/:id", updateSemester);
semesterRouter.delete("/v1/semester/:id", deleteSemester);
semesterRouter.get("/v1/semesters", getAllSemesters);