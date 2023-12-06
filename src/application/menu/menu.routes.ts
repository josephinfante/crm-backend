import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { MenuController } from "./menu.controller";

const menuRouter = Router();
const menuController = new MenuController();

menuRouter.get("/v1/menu", Access.canRead('menu'), menuController.findAllPagesByRoleId.bind(menuController));
export default menuRouter;