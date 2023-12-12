import { Router } from "express";
import { Access } from "../../shared/middlewares";
import { FileController } from "./file.controller";
import { FileRepositoryImpl } from "../../infrastructure/file/file.repository.impl";
import { FileCrudUseCase } from "./use-cases/file-crud.usecase";

const fileRouter = Router();
const fileRepository = new FileRepositoryImpl();
const fileCrudUseCase = new FileCrudUseCase(fileRepository);
const fileController = new FileController(fileCrudUseCase);

fileRouter.post("/v1/files", fileController.upload.bind(fileController));
fileRouter.delete("/v1/files", Access.canDelete(['files']), fileController.delete.bind(fileController));
fileRouter.get("/v1/files", Access.canRead(['files']), fileController.findAll.bind(fileController));
export default fileRouter;