import { Request, Response } from "express";
import { CollegeCrudUseCase } from "./use-cases/college-crud.usecase";
import { CollegeError } from "../../shared/errors";

export class CollegeController {
    private college: CollegeCrudUseCase;
    constructor(college: CollegeCrudUseCase) {
        this.college = college;
    }
    async create(req: Request, res: Response) {
        try {
            const college = await this.college.create(res.locals.access, req.body);
            res.status(201).json(college);
        } catch (error) {
            if (error instanceof CollegeError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear la institución educativa.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const college = await this.college.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(college);
        } catch (error) {
            if (error instanceof CollegeError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar la institución educativa.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.college.delete(res.locals.access, req.params.id);
            res.status(200).json({ message: response });
        } catch (error) {
            if (error instanceof CollegeError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar la institución educativa.'});
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const colleges = await this.college.findAll(res.locals.access, req.query.college?.toString());
            res.status(200).json(colleges);
        } catch (error) {
            if (error instanceof CollegeError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar las instituciones educativas.'});
        }
    }
}