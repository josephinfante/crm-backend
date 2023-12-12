import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { RoleRepositoryImpl } from "../../infrastructure/role/role.repository.impl";
import { RoleCrudUseCase } from "./use-cases/role-crud.usecase";
import { RoleController } from "./role.controller";

const roleRouter = Router();
const roleRepository = new RoleRepositoryImpl();
const roleCrudUseCase = new RoleCrudUseCase(roleRepository);
const roleController = new RoleController(roleCrudUseCase);

roleRouter.post("/v1/role", Access.canCreate(['role']), roleController.create.bind(roleController));
roleRouter.put("/v1/role/:id", Access.canUpdate(['role']), roleController.update.bind(roleController));
roleRouter.delete("/v1/role/:id", Access.canDelete(['role']), roleController.delete.bind(roleController));
roleRouter.get("/v1/roles", Access.canRead(['role']), roleController.findAll.bind(roleController));
export default roleRouter;