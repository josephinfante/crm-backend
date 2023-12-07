import { Request, Response } from "express";
import { FindAllPagesWithRoleId } from "../../infrastructure/menu/menu.dao";
import { MenuError } from "../../shared/errors";

export class MenuController {
    async findAllPagesByRoleId(_req: Request, res: Response) {
        try {
            const pages = await FindAllPagesWithRoleId(res.locals.role_id);
            res.status(200).json(pages);
        } catch (error) {
            if (error instanceof MenuError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener las páginas.'});
        }
    }
}