import { Router } from "express";
import { createComponent, deleteComponent, getAllComponent, getComponent, updateComponent } from "./component.controller";

export const componentRouter = Router();

componentRouter.post("/v1/component", createComponent);
componentRouter.get("/v1/component/:id", getComponent);
componentRouter.put("/v1/component/:id", updateComponent);
componentRouter.delete("/v1/component/:id", deleteComponent);
componentRouter.get("/v1/components", getAllComponent);