import { Request, Response } from "express";
import { ContactCrudUseCase } from "./use-cases/contact-crud.usecase";
import { ContactError } from "../../shared/errors";

export class ContactController {
    private contact: ContactCrudUseCase;
    constructor(contact: ContactCrudUseCase) {
        this.contact = contact;
    }
    async create(req: Request, res: Response) {
        try {
            const contact = await this.contact.create(res.locals.access, req.body);
            res.status(201).json(contact);
        } catch (error) {
            if (error instanceof ContactError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear el contacto.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const contact = await this.contact.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(contact);
        } catch (error) {
            if (error instanceof ContactError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar el contacto.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.contact.delete(res.locals.access, req.params.id);
            res.status(200).json({ message: response });
        } catch (error) {
            if (error instanceof ContactError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar el contacto.'});
        }
    }
    async findById(req: Request, res: Response) {
        try {
            const contact = await this.contact.findById(res.locals.access, req.params.id);
            res.status(200).json(contact);
        } catch (error) {
            if (error instanceof ContactError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar el contacto.'});
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const contacts = await this.contact.findAll(res.locals.access, Number(req.query.page??1), req.query.value?.toString());
            res.status(200).json(contacts);
        } catch (error) {
            if (error instanceof ContactError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar los contactos.'});
        }
    }
}