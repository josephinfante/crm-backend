import { Request, Response } from "express";
import { ContactChannelDetailError } from "../../shared/errors";
import { ContactChannelDetailCrudUseCase } from "./use-cases/contact-channel-detail-crud.usecase";

export class ContactChannelDetailController {
    private contact_channel_detail: ContactChannelDetailCrudUseCase;
    constructor(contact_channel_detail: ContactChannelDetailCrudUseCase) {
        this.contact_channel_detail = contact_channel_detail;
    }
    async create(req: Request, res: Response) {
        try {
            const contact_channel_detail = await this.contact_channel_detail.create(res.locals.access, req.body);
            res.status(201).json(contact_channel_detail);
        } catch (error) {
            if (error instanceof ContactChannelDetailError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear el detalle del canal de contacto.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const contact_channel_detail = await this.contact_channel_detail.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(contact_channel_detail);
        } catch (error) {
            if (error instanceof ContactChannelDetailError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar el detalle del canal de contacto.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.contact_channel_detail.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof ContactChannelDetailError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar el detalle del canal de contacto.'});
        }
    }
    async findByContactChannelId(req: Request, res: Response) {
        try {
            const contact_channel_details = await this.contact_channel_detail.findByContactChannelId(res.locals.access, req.params.contact_channel_id);
            res.status(200).json(contact_channel_details);
        } catch (error) {
            if (error instanceof ContactChannelDetailError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener los detalles del canal de contacto.'});
        }
    }
}