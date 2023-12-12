import { Router } from "express";
import { UserRepositoryImpl } from "../../infrastructure/user/user.repository.impl";
import { UserCrudUseCase } from "./use-cases/user-crud.usecase";
import { UserController } from "./user.controller";
import { Access } from "../../shared/middlewares";

const userRouter = Router();
const userRepository = new UserRepositoryImpl();
const userCrudUseCase = new UserCrudUseCase(userRepository);
const userController = new UserController(userCrudUseCase);

userRouter.post("/v1/user", Access.canCreate(['user']), userController.create.bind(userController));
userRouter.put("/v1/user/:id", Access.canUpdate(['user']), userController.update.bind(userController));
userRouter.delete("/v1/user/:id", Access.canDelete(['user']), userController.delete.bind(userController));
userRouter.get("/v1/user/:id", Access.canRead(['user']), userController.findById.bind(userController));
userRouter.get("/v1/users", Access.canRead(['user']), userController.findAll.bind(userController));
userRouter.post("/v1/login", userController.login.bind(userController));
export default userRouter;