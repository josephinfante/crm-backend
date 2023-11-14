import { Router } from "express";
import { createRole, deleteRole, getAllRoles, getRole, updateRole } from "./role.controller";
// import { isAdminAuth } from "../../shared/middlewares";

export const roleRouter = Router();

roleRouter.post("/v1/role", createRole);
roleRouter.get("/v1/role/:id", getRole);
roleRouter.put("/v1/role/:id", updateRole);
roleRouter.delete("/v1/role/:id", deleteRole);
roleRouter.get("/v1/roles", getAllRoles);