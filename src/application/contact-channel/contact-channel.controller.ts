import { Request, Response } from "express";
import { ContactChannelError } from "../../shared/errors";
import { ContactChannelCrudUseCase } from "./use-cases/contact-channel-crud.usecase";

export class ContactChannelController {
    private contact_channel: ContactChannelCrudUseCase;
    constructor(contact_channel: ContactChannelCrudUseCase) {
        this.contact_channel = contact_channel;
    }
    async create(req: Request, res: Response) {
        try {
            const contact_channel = await this.contact_channel.create(res.locals.access, req.body);
            res.status(201).json(contact_channel);
        } catch (error) {
            if (error instanceof ContactChannelError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear el canal de contacto.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const contact_channel = await this.contact_channel.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(contact_channel);
        } catch (error) {
            if (error instanceof ContactChannelError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar el canal de contacto.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.contact_channel.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof ContactChannelError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar el canal de contacto.'});
        }
    }
    async findAll(_req: Request, res: Response) {
        try {
            const contact_channels = await this.contact_channel.findAll(res.locals.access);
            res.status(200).json(contact_channels);
        } catch (error) {
            if (error instanceof ContactChannelError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener los canales de contacto.'});
        }
    }
}