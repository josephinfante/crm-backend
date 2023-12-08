import { Request, Response } from "express";
import { EventControlError } from "../../shared/errors";
import { EventControlCrudUseCase } from "./use-cases/event-control-crud.usecase";

export class EventControlController {
    private event_control: EventControlCrudUseCase;
    constructor(event_control: EventControlCrudUseCase) {
        this.event_control = event_control;
    }
    async create(req: Request, res: Response) {
        try {
            const event_control = await this.event_control.create(res.locals.access, req.body);
            res.status(201).json(event_control);
        } catch (error) {
            if (error instanceof EventControlError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear el control de evento.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const event_control = await this.event_control.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(event_control);
        } catch (error) {
            if (error instanceof EventControlError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar el control de evento.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.event_control.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof EventControlError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar el control de evento.'});
        }
    }
    async findById(req: Request, res: Response) {
        try {
            const event_control = await this.event_control.findById(res.locals.access, req.params.id);
            res.status(200).json(event_control);
        } catch (error) {
            if (error instanceof EventControlError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar el control de evento.'});
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const event_controls = await this.event_control.findAll(res.locals.access, Number(req.query.page??1));
            res.status(200).json(event_controls);
        } catch (error) {
            if (error instanceof EventControlError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar los controles de eventos.'});
        }
    }
}