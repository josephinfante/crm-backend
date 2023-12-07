import { Request, Response } from "express";
import { PeriodError } from "../../shared/errors";
import { PeriodCrudUseCase } from "./use-cases/period-crud.usecase";

export class PeriodController {
    private period: PeriodCrudUseCase;
    constructor(period: PeriodCrudUseCase) {
        this.period = period;
    }
    async create(req: Request, res: Response) {
        try {
            const period = await this.period.create(res.locals.access, req.body);
            res.status(201).json(period);
        } catch (error) {
            if (error instanceof PeriodError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear el período académico.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const period = await this.period.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(period);
        } catch (error) {
            if (error instanceof PeriodError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar el período académico.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.period.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof PeriodError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar el período académico.'});
        }
    }
    async findByBusinessUnitId(req: Request, res: Response) {
        try {
            const periods = await this.period.findByBusinessUnitId(res.locals.access, req.params.business_unit_id);
            res.status(200).json(periods);
        } catch (error) {
            if (error instanceof PeriodError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener los períodos académicos.'});
        }
    }
    async findAll(_req: Request, res: Response) {
        try {
            const periods = await this.period.findAll(res.locals.access);
            res.status(200).json(periods);
        } catch (error) {
            if (error instanceof PeriodError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener los períodos académicos.'});
        }
    }
}