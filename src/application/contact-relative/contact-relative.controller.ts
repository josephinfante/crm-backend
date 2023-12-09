import { Request, Response } from "express";
import { ContactRelativeError } from "../../shared/errors";
import { ContactRelativeCrudUseCase } from "./use-cases/contact-relative-crud.usecase";

export class ContactRelativeController {
    private contact_relative: ContactRelativeCrudUseCase;
    constructor(contact_relative: ContactRelativeCrudUseCase) {
        this.contact_relative = contact_relative;
    }
    async create(req: Request, res: Response) {
        try {
            const contact_relative = await this.contact_relative.create(res.locals.access, req.body);
            res.status(201).json(contact_relative);
        } catch (error) {
            if (error instanceof ContactRelativeError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear el detalle del canal de contacto.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const contact_relative = await this.contact_relative.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(contact_relative);
        } catch (error) {
            if (error instanceof ContactRelativeError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar el detalle del canal de contacto.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.contact_relative.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof ContactRelativeError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar el detalle del canal de contacto.'});
        }
    }
    async findByContactId(req: Request, res: Response) {
        try {
            const contact_relatives = await this.contact_relative.findByContactId(res.locals.access, req.params.contact_channel_id);
            res.status(200).json(contact_relatives);
        } catch (error) {
            if (error instanceof ContactRelativeError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener los detalles del canal de contacto.'});
        }
    }
    async findById(req: Request, res: Response) {
        try {
            const contact_relatives = await this.contact_relative.findById(res.locals.access, req.params.id);
            res.status(200).json(contact_relatives);
        } catch (error) {
            if (error instanceof ContactRelativeError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener los detalles del canal de contacto.'});
        }
    }
}