import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { CollegeRepositoryImpl } from "../../infrastructure/college/college.repository.impl";
import { CollegeCrudUseCase } from "./use-cases/college-crud.usecase";
import { CollegeController } from "./college.controller";

const collegeRouter = Router();
const collegeRepository = new CollegeRepositoryImpl();
const collegeCrudUseCase = new CollegeCrudUseCase(collegeRepository);
const collegeController = new CollegeController(collegeCrudUseCase);

collegeRouter.post("/v1/college", Access.canCreate(['college']), collegeController.create.bind(collegeController));
collegeRouter.put("/v1/college/:id", Access.canUpdate(['college']), collegeController.update.bind(collegeController));
collegeRouter.delete("/v1/college/:id", Access.canDelete(['college']), collegeController.delete.bind(collegeController));
collegeRouter.get("/v1/colleges", Access.canRead(['college']), collegeController.findAll.bind(collegeController));
export default collegeRouter;