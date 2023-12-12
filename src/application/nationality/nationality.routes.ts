import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { NationalityRepositoryImpl } from "../../infrastructure/nationality/nationality.repository.impl";
import { NationalityCrudUseCase } from "./use-cases/nationality-crud.usecase";
import { NationalityController } from "./nationality.controller";

const nationalityRouter = Router();
const nationalityRepository = new NationalityRepositoryImpl();
const nationalityCrudUseCase = new NationalityCrudUseCase(nationalityRepository);
const nationalityController = new NationalityController(nationalityCrudUseCase);

nationalityRouter.post("/v1/nationality", Access.canCreate(['nationality']), nationalityController.create.bind(nationalityController));
nationalityRouter.put("/v1/nationality/:id", Access.canUpdate(['nationality']), nationalityController.update.bind(nationalityController));
nationalityRouter.delete("/v1/nationality/:id", Access.canDelete(['nationality']), nationalityController.delete.bind(nationalityController));
nationalityRouter.get("/v1/nationalities", Access.canRead(['nationality']), nationalityController.findAll.bind(nationalityController));
export default nationalityRouter;