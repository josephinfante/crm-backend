import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUser, login, updateUser } from "./user.controller";
import { isAdminAuth } from "../../shared/middlewares";

export const userRouter = Router();

userRouter.post("/v1/login", login);
userRouter.post("/v1/user", isAdminAuth,createUser);
userRouter.get("/v1/user/:id", isAdminAuth, getUser);
userRouter.put("/v1/user/:id", isAdminAuth, updateUser);
userRouter.delete("/v1/user/:id", isAdminAuth, deleteUser);
userRouter.get("/v1/users", isAdminAuth, getAllUsers);