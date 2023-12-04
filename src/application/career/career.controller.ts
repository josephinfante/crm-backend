import { Request, Response } from "express";
import { CareerCrudUseCase } from "./use-cases/career-crud.usecase";
import { CareerError } from "../../shared/errors";

export class CareerController {
    private career: CareerCrudUseCase;
    constructor(career: CareerCrudUseCase) {
        this.career = career;
    }
    async create(req: Request, res: Response) {
        try {
            const career = await this.career.create(res.locals.access, req.body);
            res.status(201).json(career);
        } catch (error) {
            if (error instanceof CareerError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear la carrera.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const career = await this.career.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(career);
        } catch (error) {
            if (error instanceof CareerError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar la carrera.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.career.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof CareerError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar la carrera.'});
        }
    }
    async findBySchoolId(req: Request, res: Response) {
        try {
            const careers = await this.career.findBySchoolId(res.locals.access, req.params.school_id);
            res.status(200).json(careers);
        } catch (error) {
            if (error instanceof CareerError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener las carreras.'});
        }
    }
    async findAll(_req: Request, res: Response) {
        try {
            const careers = await this.career.findAll(res.locals.access);
            res.status(200).json(careers);
        } catch (error) {
            if (error instanceof CareerError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener las carreras.'});
        }
    }
}