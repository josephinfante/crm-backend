import { Router } from "express";
import { createPermission, deletePermission, getAllPermissions, getPermission, updatePermission } from "./permission.controller";

export const permissionRouter = Router();

permissionRouter.post("/v1/permission", createPermission);
permissionRouter.get("/v1/permission/:id", getPermission);
permissionRouter.put("/v1/permission/:id", updatePermission);
permissionRouter.delete("/v1/permission/:id", deletePermission);
permissionRouter.get("/v1/permissions", getAllPermissions);
