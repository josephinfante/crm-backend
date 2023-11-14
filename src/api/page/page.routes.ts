import { Router } from "express";
import { createPage, getPage, updatePage, deletePage, getAllPages, getPagesByRoleName } from "./page.controller";

export const pageRouter = Router();

pageRouter.post("/v1/page", createPage);
pageRouter.get("/v1/page/:id", getPage);
pageRouter.put("/v1/page/:id", updatePage);
pageRouter.delete("/v1/page/:id", deletePage);
pageRouter.get("/v1/pages", getAllPages);
pageRouter.get("/v1/pages/:role_name", getPagesByRoleName);