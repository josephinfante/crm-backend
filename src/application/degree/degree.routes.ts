import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { DegreeRepositoryImpl } from "../../infrastructure/degree/degree.repository.impl";
import { DegreeCrudUseCase } from "./use-cases/degree-crud.usecase";
import { DegreeController } from "./degree.controller";

const degreeRouter = Router();
const degreeRepository = new DegreeRepositoryImpl();
const degreeCrudUseCase = new DegreeCrudUseCase(degreeRepository);
const degreeController = new DegreeController(degreeCrudUseCase);

degreeRouter.post("/v1/degree", Access.canCreate('degree'), degreeController.create.bind(degreeController));
degreeRouter.put("/v1/degree/:id", Access.canUpdate('degree'), degreeController.update.bind(degreeController));
degreeRouter.delete("/v1/degree/:id", Access.canDelete('degree'), degreeController.delete.bind(degreeController));
degreeRouter.get("/v1/degree/:id", Access.canRead('degree'), degreeController.findById.bind(degreeController));
degreeRouter.get("/v1/degrees", Access.canRead('degree'), degreeController.findAll.bind(degreeController));
export default degreeRouter;