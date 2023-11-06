import { Router } from "express";
import { createRole, deleteRole, getAllRoles, getRole, updateRole } from "./role.controller";
import { isAdminAuth } from "../../shared/middlewares";

export const roleRouter = Router();

roleRouter.post("/v1/role", isAdminAuth, createRole);
roleRouter.get("/v1/role/:id", isAdminAuth, getRole);
roleRouter.put("/v1/role/:id", isAdminAuth, updateRole);
roleRouter.delete("/v1/role/:id", isAdminAuth, deleteRole);
roleRouter.get("/v1/roles", isAdminAuth, getAllRoles);