import { Request, Response } from "express";
import { DegreeSpecificationError } from "../../shared/errors";
import { DegreeSpecificationCrudUseCase } from "./use-cases/degree-specification-crud.usecase";

export class DegreeSpecificationController {
    private degree_specification: DegreeSpecificationCrudUseCase;
    constructor(degree_specification: DegreeSpecificationCrudUseCase) {
        this.degree_specification = degree_specification;
    }
    async create(req: Request, res: Response) {
        try {
            const degree_specification = await this.degree_specification.create(res.locals.access, req.body);
            res.status(201).json(degree_specification);
        } catch (error) {
            if (error instanceof DegreeSpecificationError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear la especificación del grado académico.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const degree_specification = await this.degree_specification.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(degree_specification);
        } catch (error) {
            if (error instanceof DegreeSpecificationError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar la especificación del grado académico.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.degree_specification.delete(res.locals.access, req.params.id);
            res.status(200).json({ message: response });
        } catch (error) {
            if (error instanceof DegreeSpecificationError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar la especificación del grado académico.'});
        }
    }
    async findByDegreeId(req: Request, res: Response) {
        try {
            const degree_specification = await this.degree_specification.findByDegreeId(res.locals.access, req.params.degree_id);
            res.status(200).json(degree_specification);
        } catch (error) {
            if (error instanceof DegreeSpecificationError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar las especificaciones del grado académico.'});
        }
    }
}