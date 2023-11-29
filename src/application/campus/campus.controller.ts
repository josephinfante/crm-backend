import { Request, Response } from "express";
import { CampusError } from "../../shared/errors";
import { CampusCrudUseCase } from "./use-cases/campus-crud.usecase";

export class CampusController {
    private campus: CampusCrudUseCase;
    constructor(campus: CampusCrudUseCase) {
        this.campus = campus;
    }
    async create(req: Request, res: Response) {
        try {
            const campus = await this.campus.create(res.locals.access, req.body);
            res.status(201).json(campus);
        } catch (error) {
            if (error instanceof CampusError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear la sede.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const campus = await this.campus.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(campus);
        } catch (error) {
            if (error instanceof CampusError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar la sede.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.campus.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof CampusError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar la sede.'});
        }
    }
    async findByBusinessUnitId(req: Request, res: Response) {
        try {
            const campuses = await this.campus.findByBusinessUnitId(res.locals.access, req.params.business_unit_id);
            res.status(200).json(campuses);
        } catch (error) {
            if (error instanceof CampusError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener las sedes.'});
        }
    }
}