import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { SchoolRepositoryImpl } from "../../infrastructure/school/school.repository.impl";
import { SchoolCrudUseCase } from "./use-cases/school-crud.usecase";
import { SchoolController } from "./school.controller";

const schoolRouter = Router();
const schoolRepository = new SchoolRepositoryImpl();
const schoolCrudUseCase = new SchoolCrudUseCase(schoolRepository);
const schoolController = new SchoolController(schoolCrudUseCase);

schoolRouter.post("/v1/school", Access.canCreate('school'), schoolController.create.bind(schoolController));
schoolRouter.put("/v1/school/:id", Access.canUpdate('school'), schoolController.update.bind(schoolController));
schoolRouter.delete("/v1/school/:id", Access.canDelete('school'), schoolController.delete.bind(schoolController));
schoolRouter.get("/v1/school/:business_unit_id", Access.canRead('school'), schoolController.findByBusinessUnitId.bind(schoolController));
export default schoolRouter;