import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { StateController } from "./state.controller";

const stateRouter = Router();
const stateController = new StateController();

stateRouter.get("/v1/states", Access.canRead('state'), stateController.findAll.bind(stateController));
export default stateRouter;