import { Request, Response } from "express";
import { TrackingClassificationError } from "../../shared/errors";
import { TrackingClassificationCrudUseCase } from "./use-cases/tracking-classification-crud.usecase";

export class TrackingClassificationController {
    private tracking_classification: TrackingClassificationCrudUseCase;
    constructor(tracking_classification: TrackingClassificationCrudUseCase) {
        this.tracking_classification = tracking_classification;
    }
    async create(req: Request, res: Response) {
        try {
            const tracking_classification = await this.tracking_classification.create(res.locals.access, req.body);
            res.status(201).json(tracking_classification);
        } catch (error) {
            if (error instanceof TrackingClassificationError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear la clasificación de seguimiento.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const tracking_classification = await this.tracking_classification.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(tracking_classification);
        } catch (error) {
            if (error instanceof TrackingClassificationError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar la clasificación de seguimiento.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.tracking_classification.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof TrackingClassificationError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar la clasificación de seguimiento.'});
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const tracking_classifications = await this.tracking_classification.findAll(res.locals.access, Number(req.query.page??1));
            res.status(200).json(tracking_classifications);
        } catch (error) {
            if (error instanceof TrackingClassificationError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar las clasificaciones de seguimiento.'});
        }
    }
}