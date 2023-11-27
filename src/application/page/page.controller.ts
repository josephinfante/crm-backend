import { Request, Response } from "express";
import { PageError } from "../../shared/errors";
import { PageCrudUseCase } from "./use-cases/page-crud.usecase";

export class PageController {
    private page: PageCrudUseCase;
    constructor(page: PageCrudUseCase) {
        this.page = page;
    }
    async create(req: Request, res: Response) {
        try {
            const page = await this.page.create(res.locals.access, req.body);
            res.status(201).json(page);
        } catch (error) {
            if (error instanceof PageError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear la página.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const page = await this.page.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(page);
        } catch (error) {
            if (error instanceof PageError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar la página.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.page.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof PageError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar la página.'});
        }
    }
    async findById(req: Request, res: Response) {
        try {
            const page = await this.page.findById(res.locals.access, req.params.id);
            res.status(200).json(page);
        } catch (error) {
            if (error instanceof PageError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener la página.'});
        }
    }
    async findAll(_req: Request, res: Response) {
        try {
            const pages = await this.page.findAll(res.locals.access);
            res.status(200).json(pages);
        } catch (error) {
            res.status(500).json({error: 'Ha ocurrido un error al obtener las páginas.'});
        }
    }
}