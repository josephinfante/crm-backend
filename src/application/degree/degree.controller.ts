import { Request, Response } from "express";
import { DegreeError } from "../../shared/errors";
import { DegreeCrudUseCase } from "./use-cases/degree-crud.usecase";

export class DegreeController {
    private degree: DegreeCrudUseCase;
    constructor(degree: DegreeCrudUseCase) {
        this.degree = degree;
    }
    async create(req: Request, res: Response) {
        try {
            const degree = await this.degree.create(res.locals.access, req.body);
            res.status(201).json(degree);
        } catch (error) {
            if (error instanceof DegreeError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear el grado académico.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const degree = await this.degree.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(degree);
        } catch (error) {
            if (error instanceof DegreeError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar el grado académico.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.degree.delete(res.locals.access, req.params.id);
            res.status(200).json({ message: response });
        } catch (error) {
            if (error instanceof DegreeError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar el grado académico.'});
        }
    }
    async findById(req: Request, res: Response) {
        try {
            const degree = await this.degree.findById(res.locals.access, req.params.id);
            res.status(200).json(degree);
        } catch (error) {
            if (error instanceof DegreeError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener el grado académico.'});
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const degrees = await this.degree.findAll(res.locals.access, req.query.degree?.toString());
            res.status(200).json(degrees);
        } catch (error) {
            if (error instanceof DegreeError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener los grados académicos.'});
        }
    }
}