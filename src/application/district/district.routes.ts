import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { DistrictController } from "./district.controller";

const districtRouter = Router();
const districtController = new DistrictController();

districtRouter.get("/v1/districts/:city_id", Access.canRead(['district']), districtController.findByCityId.bind(districtController));
export default districtRouter;