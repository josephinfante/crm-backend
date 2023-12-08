import { Request, Response } from "express";
import { EventError } from "../../shared/errors";
import { EventCrudUseCase } from "./use-cases/event-crud.usecase";

export class EventController {
    private event: EventCrudUseCase;
    constructor(event: EventCrudUseCase) {
        this.event = event;
    }
    async create(req: Request, res: Response) {
        try {
            const event = await this.event.create(res.locals.access, req.body);
            res.status(201).json(event);
        } catch (error) {
            if (error instanceof EventError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear el evento.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const event = await this.event.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(event);
        } catch (error) {
            if (error instanceof EventError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar el evento.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.event.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof EventError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar el evento.'});
        }
    }
    async findById(req: Request, res: Response) {
        try {
            const event = await this.event.findById(res.locals.access, req.params.id);
            res.status(200).json(event);
        } catch (error) {
            if (error instanceof EventError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar el evento.'});
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const events = await this.event.findAll(res.locals.access, Number(req.query.page??1));
            res.status(200).json(events);
        } catch (error) {
            if (error instanceof EventError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar los eventos.'});
        }
    }
}