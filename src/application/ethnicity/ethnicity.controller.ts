import { Request, Response } from "express";
import { EthnicityCrudUseCase } from "./use-cases/ethnicity-crud.usecase";
import { EthnicityError } from "../../shared/errors";

export class EthnicityController {
    private ethnicity: EthnicityCrudUseCase;
    constructor(ethnicity: EthnicityCrudUseCase) {
        this.ethnicity = ethnicity;
    }
    async create(req: Request, res: Response) {
        try {
            const ethnicity = await this.ethnicity.create(res.locals.access, req.body);
            res.status(201).json(ethnicity);
        } catch (error) {
            if (error instanceof EthnicityError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear la etnia.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const ethnicity = await this.ethnicity.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(ethnicity);
        } catch (error) {
            if (error instanceof EthnicityError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar la etnia.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.ethnicity.delete(res.locals.access, req.params.id);
            res.status(200).json({ message: response });
        } catch (error) {
            if (error instanceof EthnicityError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar la etnia.'});
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const ethnicities = await this.ethnicity.findAll(res.locals.access, req.query.ethnicity?.toString());
            res.status(200).json(ethnicities);
        } catch (error) {
            if (error instanceof EthnicityError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar las etnias'});
        }
    }
}