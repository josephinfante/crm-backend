import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUser, login, updateUser } from "./user.controller";

export const userRouter = Router();

userRouter.post("/v1/login", login);
userRouter.post("/v1/user",createUser);
userRouter.get("/v1/user/:id", getUser);
userRouter.put("/v1/user/:id", updateUser);
userRouter.delete("/v1/user/:id", deleteUser);
userRouter.get("/v1/users", getAllUsers);