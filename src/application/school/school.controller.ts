import { Request, Response } from "express";
import { SchoolCrudUseCase } from "./use-cases/school-crud.usecase";
import { SchoolError } from "../../shared/errors";

export class SchoolController {
    private school: SchoolCrudUseCase;
    constructor(school: SchoolCrudUseCase) {
        this.school = school;
    }
    async create(req: Request, res: Response) {
        try {
            const school = await this.school.create(res.locals.access, req.body);
            res.status(201).json(school);
        } catch (error) {
            if (error instanceof SchoolError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear la escuela profesional.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const school = await this.school.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(school);
        } catch (error) {
            if (error instanceof SchoolError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar la escuela profesional.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.school.delete(res.locals.access, req.params.id);
            res.status(200).json({ message: response });
        } catch (error) {
            if (error instanceof SchoolError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar la escuela profesional.'});
        }
    }
    async findByBusinessUnitId(req: Request, res: Response) {
        try {
            const schools = await this.school.findByBusinessUnitId(res.locals.access, req.params.business_unit_id);
            res.status(200).json(schools);
        } catch (error) {
            if (error instanceof SchoolError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener las escuelas profesionales.'});
        }
    }
    async findAll(_req: Request, res: Response) {
        try {
            const schools = await this.school.findAll(res.locals.access);
            res.status(200).json(schools);
        } catch (error) {
            if (error instanceof SchoolError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener las escuelas profesionales.'});
        }
    }
}