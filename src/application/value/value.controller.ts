import { Request, Response } from "express";
import { ValueError } from "../../shared/errors";
import { ValueCrudUseCase } from "./use-cases/value-crud.usecase";

export class ValueController {
    private value: ValueCrudUseCase;
    constructor(value: ValueCrudUseCase) {
        this.value = value;
    }
    async create(req: Request, res: Response) {
        try {
            const value = await this.value.create(res.locals.access, req.body);
            res.status(201).json(value);
        } catch (error) {
            if (error instanceof ValueError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear el detalle del canal de contacto.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const value = await this.value.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(value);
        } catch (error) {
            if (error instanceof ValueError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar el detalle del canal de contacto.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.value.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof ValueError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar el detalle del canal de contacto.'});
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const values = await this.value.findAll(res.locals.access, Boolean(req.query.hidden));
            res.status(200).json(values);
        } catch (error) {
            if (error instanceof ValueError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener los detalles del canal de contacto.'});
        }
    }
    async findById(req: Request, res: Response) {
        try {
            const value = await this.value.findById(res.locals.access, req.params.id);
            res.status(200).json(value);
        } catch (error) {
            if (error instanceof ValueError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener los detalles del canal de contacto.'});
        }
    }
}