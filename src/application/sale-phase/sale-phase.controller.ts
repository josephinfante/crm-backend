import { Request, Response } from "express";
import { SalePhaseError } from "../../shared/errors";
import { SalePhaseCrudUseCase } from "./use-cases/sale-phase-crud.usecase";

export class SalePhaseController {
    private sale_phase: SalePhaseCrudUseCase;
    constructor(sale_phase: SalePhaseCrudUseCase) {
        this.sale_phase = sale_phase;
    }
    async create(req: Request, res: Response) {
        try {
            const sale_phase = await this.sale_phase.create(res.locals.access, req.body);
            res.status(201).json(sale_phase);
        } catch (error) {
            if (error instanceof SalePhaseError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear la fase de venta.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const sale_phase = await this.sale_phase.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(sale_phase);
        } catch (error) {
            if (error instanceof SalePhaseError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar la fase de venta.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.sale_phase.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof SalePhaseError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar la fase de venta.'});
        }
    }
    async findAll(_req: Request, res: Response) {
        try {
            const sale_phases = await this.sale_phase.findAll(res.locals.access);
            res.status(200).json(sale_phases);
        } catch (error) {
            if (error instanceof SalePhaseError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar las fases de venta.'});
        }
    }
}