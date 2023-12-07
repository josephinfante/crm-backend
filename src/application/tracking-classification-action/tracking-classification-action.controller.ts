import { Request, Response } from "express";
import { TrackingClassificationActionError } from "../../shared/errors";
import { TrackingClassificationActionCrudUseCase } from "./use-cases/tracking-classification-action-crud.usecase";

export class TrackingClassificationActionController {
    private tracking_classification_action: TrackingClassificationActionCrudUseCase;
    constructor(tracking_classification_action: TrackingClassificationActionCrudUseCase) {
        this.tracking_classification_action = tracking_classification_action;
    }
    async create(req: Request, res: Response) {
        try {
            const tracking_classification_action = await this.tracking_classification_action.create(res.locals.access, req.body);
            res.status(201).json(tracking_classification_action);
        } catch (error) {
            if (error instanceof TrackingClassificationActionError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear la acción de clasificación de seguimiento.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const tracking_classification_action = await this.tracking_classification_action.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(tracking_classification_action);
        } catch (error) {
            if (error instanceof TrackingClassificationActionError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar la acción de clasificación de seguimiento.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.tracking_classification_action.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof TrackingClassificationActionError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar la acción de clasificación de seguimiento.'});
        }
    }
    async findByTrackingClassificationId(req: Request, res: Response) {
        try {
            const tracking_classification_actions = await this.tracking_classification_action.findByTrackingClassificationId(res.locals.access, Number(req.query.page??1), req.params.tracking_classification_id);
            res.status(200).json(tracking_classification_actions);
        } catch (error) {
            if (error instanceof TrackingClassificationActionError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar las acciones de clasificación de seguimiento.'});
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const tracking_classification_actions = await this.tracking_classification_action.findAll(res.locals.access, Number(req.query.page??1));
            res.status(200).json(tracking_classification_actions);
        } catch (error) {
            if (error instanceof TrackingClassificationActionError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar las acciones de clasificación de seguimiento.'});
        }
    }
}