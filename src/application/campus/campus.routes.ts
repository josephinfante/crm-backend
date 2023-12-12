import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { CampusRepositoryImpl } from "../../infrastructure/campus/campus.repository.impl";
import { CampusCrudUseCase } from "./use-cases/campus-crud.usecase";
import { CampusController } from "./campus.controller";

const campusRouter = Router();
const campusRepository = new CampusRepositoryImpl();
const campusCrudUseCase = new CampusCrudUseCase(campusRepository);
const campusController = new CampusController(campusCrudUseCase);

campusRouter.post("/v1/campus", Access.canCreate(['campus']), campusController.create.bind(campusController));
campusRouter.put("/v1/campus/:id", Access.canUpdate(['campus']), campusController.update.bind(campusController));
campusRouter.delete("/v1/campus/:id", Access.canDelete(['campus']), campusController.delete.bind(campusController));
campusRouter.get("/v1/campuses/:business_unit_id", Access.canRead(['campus']), campusController.findByBusinessUnitId.bind(campusController));
export default campusRouter;