import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { LanguageRepositoryImpl } from "../../infrastructure/language/language.repository.impl";
import { LanguageCrudUseCase } from "./use-cases/language-crud.usecase";
import { LanguageController } from "./language.controller";

const languageRouter = Router();
const languageRepository = new LanguageRepositoryImpl();
const languageCrudUseCase = new LanguageCrudUseCase(languageRepository);
const languageController = new LanguageController(languageCrudUseCase);

languageRouter.post("/v1/language", Access.canCreate(['language']), languageController.create.bind(languageController));
languageRouter.put("/v1/language/:id", Access.canUpdate(['language']), languageController.update.bind(languageController));
languageRouter.delete("/v1/language/:id", Access.canDelete(['language']), languageController.delete.bind(languageController));
languageRouter.get("/v1/languages", Access.canRead(['language']), languageController.findAll.bind(languageController));
export default languageRouter;