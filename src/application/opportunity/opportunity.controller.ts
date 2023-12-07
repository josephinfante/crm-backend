import { Request, Response } from "express";
import { OpportunityError } from "../../shared/errors";
import { OpportunityCrudUseCase } from "./use-cases/opportunity-crud.usecase";

export class OpportunityController {
    private opportunity: OpportunityCrudUseCase;
    constructor(opportunity: OpportunityCrudUseCase) {
        this.opportunity = opportunity;
    }
    async create(req: Request, res: Response) {
        try {
            const opportunity = await this.opportunity.create(res.locals.access, req.body);
            res.status(201).json(opportunity);
        } catch (error) {
            if (error instanceof OpportunityError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear la oportunidad.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const opportunity = await this.opportunity.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(opportunity);
        } catch (error) {
            if (error instanceof OpportunityError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar la oportunidad.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.opportunity.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof OpportunityError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar la oportunidad.'});
        }
    }
    async findById(req: Request, res: Response) {
        try {
            const opportunity = await this.opportunity.findById(res.locals.access, req.params.id);
            res.status(200).json(opportunity);
        } catch (error) {
            if (error instanceof OpportunityError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar la oportunidad.'});
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const opportunities = await this.opportunity.findAll(res.locals.access, Number(req.query.page??1));
            res.status(200).json(opportunities);
        } catch (error) {
            if (error instanceof OpportunityError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar las oportunidades.'});
        }
    }
}