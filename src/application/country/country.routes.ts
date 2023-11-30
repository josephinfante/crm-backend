import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { CountryController } from "./country.controller";

const countryRouter = Router();
const countryController = new CountryController();

countryRouter.get("/v1/countries", Access.canRead('country'), countryController.findAll.bind(countryController));
export default countryRouter;