import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { DegreeSpecificationRepositoryImpl } from "../../infrastructure/degree-specification/degree-specification.repository.impl";
import { DegreeSpecificationCrudUseCase } from "./use-cases/degree-specification-crud.usecase";
import { DegreeSpecificationController } from "./degree-specification.controller";

const degreeSpecificationRouter = Router();
const degreeSpecificationRepository = new DegreeSpecificationRepositoryImpl();
const degreeSpecificationCrudUseCase = new DegreeSpecificationCrudUseCase(degreeSpecificationRepository);
const degreeSpecificationController = new DegreeSpecificationController(degreeSpecificationCrudUseCase);

degreeSpecificationRouter.post("/v1/degree-specification", Access.canCreate(['degree-specification']), degreeSpecificationController.create.bind(degreeSpecificationController));
degreeSpecificationRouter.put("/v1/degree-specification/:id", Access.canUpdate(['degree-specification']), degreeSpecificationController.update.bind(degreeSpecificationController));
degreeSpecificationRouter.delete("/v1/degree-specification/:id", Access.canDelete(['degree-specification']), degreeSpecificationController.delete.bind(degreeSpecificationController));
degreeSpecificationRouter.get("/v1/degree-specification/:degree_id", Access.canRead(['degree-specification']), degreeSpecificationController.findByDegreeId.bind(degreeSpecificationController));
export default degreeSpecificationRouter;