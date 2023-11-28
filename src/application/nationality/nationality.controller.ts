import { Request, Response } from "express";
import { NationalityError } from "../../shared/errors";
import { NationalityCrudUseCase } from "./use-cases/nationality-crud.usecase";

export class NationalityController {
    private nationality: NationalityCrudUseCase;
    constructor(nationality: NationalityCrudUseCase) {
        this.nationality = nationality;
    }
    async create(req: Request, res: Response) {
        try {
            const nationality = await this.nationality.create(res.locals.access, req.body);
            res.status(201).json(nationality);
        } catch (error) {
            if (error instanceof NationalityError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear la nacionalidad.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const nationality = await this.nationality.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(nationality);
        } catch (error) {
            if (error instanceof NationalityError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar la nacionalidad.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.nationality.delete(res.locals.access, req.params.id);
            res.status(200).json({ message: response });
        } catch (error) {
            if (error instanceof NationalityError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar la nacionalidad.'});
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const nationalities = await this.nationality.findAll(res.locals.access, req.query.nationality?.toString());
            res.status(200).json(nationalities);
        } catch (error) {
            if (error instanceof NationalityError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar las nacionalidades'});
        }
    }
}