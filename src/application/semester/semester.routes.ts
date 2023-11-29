import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { SemesterRepositoryImpl } from "../../infrastructure/semester/semester.repository.impl";
import { SemesterCrudUseCase } from "./use-cases/semester-crud.usecase";
import { SemesterController } from "./semester.controller";

const semesterRouter = Router();
const semesterRepository = new SemesterRepositoryImpl();
const semesterCrudUseCase = new SemesterCrudUseCase(semesterRepository);
const semesterController = new SemesterController(semesterCrudUseCase);

semesterRouter.post("/v1/semester", Access.canCreate('semester'), semesterController.create.bind(semesterController));
semesterRouter.put("/v1/semester/:id", Access.canUpdate('semester'), semesterController.update.bind(semesterController));
semesterRouter.delete("/v1/semester/:id", Access.canDelete('semester'), semesterController.delete.bind(semesterController));
semesterRouter.get("/v1/semester/:business_unit_id", Access.canRead('semester'), semesterController.findByBusinessUnitId.bind(semesterController));
export default semesterRouter;