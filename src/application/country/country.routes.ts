import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { CountryRepositoryImpl } from "../../infrastructure/country/country.repository.impl";
import { CountryCrudUseCase } from "./use-cases/country-crud.usecase";
import { CountryController } from "./country.controller";

const countryRouter = Router();
const countryRepository = new CountryRepositoryImpl();
const countryCrudUseCase = new CountryCrudUseCase(countryRepository);
const countryController = new CountryController(countryCrudUseCase);

countryRouter.post("/v1/country", Access.canCreate('country'), countryController.create.bind(countryController));
countryRouter.put("/v1/country/:id", Access.canUpdate('country'), countryController.update.bind(countryController));
countryRouter.delete("/v1/country/:id", Access.canDelete('country'), countryController.delete.bind(countryController));
countryRouter.get("/v1/countries", Access.canRead('country'), countryController.findAll.bind(countryController));
export default countryRouter;