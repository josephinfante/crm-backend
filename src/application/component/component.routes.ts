import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { ComponentController } from "./component.controller";

const componentRouter = Router();
const componentController = new ComponentController();

componentRouter.get("/v1/component/:id", Access.canRead(['component']), componentController.findById.bind(componentController));
componentRouter.get("/v1/components", Access.canRead(['component']), componentController.findAll.bind(componentController));
export default componentRouter;