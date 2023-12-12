import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { PageRepositoryImpl } from "../../infrastructure/page/page.repository.impl";
import { PageCrudUseCase } from "./use-cases/page-crud.usecase";
import { PageController } from "./page.controller";

const pageRouter = Router();
const pageRepository = new PageRepositoryImpl();
const pageCrudUseCase = new PageCrudUseCase(pageRepository);
const pageController = new PageController(pageCrudUseCase);

pageRouter.post("/v1/page", Access.canCreate(['page']), pageController.create.bind(pageController));
pageRouter.put("/v1/page/:id", Access.canUpdate(['page']), pageController.update.bind(pageController));
pageRouter.delete("/v1/page/:id", Access.canDelete(['page']), pageController.delete.bind(pageController));
pageRouter.get("/v1/page/:id", Access.canRead(['page']), pageController.findById.bind(pageController));
pageRouter.get("/v1/pages", Access.canRead(['page']), pageController.findAll.bind(pageController));
export default pageRouter;