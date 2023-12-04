import { Request, Response } from "express";
import { SemesterError } from "../../shared/errors";
import { SemesterCrudUseCase } from "./use-cases/semester-crud.usecase";

export class SemesterController {
    private semester: SemesterCrudUseCase;
    constructor(semester: SemesterCrudUseCase) {
        this.semester = semester;
    }
    async create(req: Request, res: Response) {
        try {
            const semester = await this.semester.create(res.locals.access, req.body);
            res.status(201).json(semester);
        } catch (error) {
            if (error instanceof SemesterError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear el semestre académico.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const semester = await this.semester.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(semester);
        } catch (error) {
            if (error instanceof SemesterError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar el semestre académico.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.semester.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof SemesterError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar el semestre académico.'});
        }
    }
    async findByBusinessUnitId(req: Request, res: Response) {
        try {
            const semesters = await this.semester.findByBusinessUnitId(res.locals.access, req.params.business_unit_id);
            res.status(200).json(semesters);
        } catch (error) {
            if (error instanceof SemesterError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener los semestres académicos.'});
        }
    }
    async findAll(_req: Request, res: Response) {
        try {
            const semesters = await this.semester.findAll(res.locals.access);
            res.status(200).json(semesters);
        } catch (error) {
            if (error instanceof SemesterError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener los semestres académicos.'});
        }
    }
}