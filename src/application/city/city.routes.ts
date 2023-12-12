import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { CityController } from "./city.controller";

const cityRouter = Router();
const cityController = new CityController();

cityRouter.get("/v1/cities/:state_id", Access.canRead(['city']), cityController.findByStateId.bind(cityController));
export default cityRouter;