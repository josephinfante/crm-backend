import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { CareerRepositoryImpl } from "../../infrastructure/career/career.repository.impl";
import { CareerCrudUseCase } from "./use-cases/career-crud.usecase";
import { CareerController } from "./career.controller";

const careerRouter = Router();
const careerRepository = new CareerRepositoryImpl();
const careerCrudUseCase = new CareerCrudUseCase(careerRepository);
const careerController = new CareerController(careerCrudUseCase);

careerRouter.post("/v1/career", Access.canCreate('career'), careerController.create.bind(careerController));
careerRouter.put("/v1/career/:id", Access.canUpdate('career'), careerController.update.bind(careerController));
careerRouter.delete("/v1/career/:id", Access.canDelete('career'), careerController.delete.bind(careerController));
careerRouter.get("/v1/career/:school_id", Access.canRead('career'), careerController.findBySchoolId.bind(careerController));
careerRouter.get("/v1/careers", Access.canRead('career'), careerController.findAll.bind(careerController));
export default careerRouter;