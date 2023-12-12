import { Request, Response } from "express";
import { MessageTemplateError } from "../../shared/errors";
import { MessageTemplateCrudUseCase } from "./use-cases/message-template-crud.usecase";

export class MessageTemplateController {
    private message_template: MessageTemplateCrudUseCase;
    constructor(message_template: MessageTemplateCrudUseCase) {
        this.message_template = message_template;
    }
    async create(req: Request, res: Response) {
        try {
            const message_template = await this.message_template.create(res.locals.access, req.body);
            res.status(201).json(message_template);
        } catch (error) {
            if (error instanceof MessageTemplateError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear el semestre académico.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const message_template = await this.message_template.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(message_template);
        } catch (error) {
            if (error instanceof MessageTemplateError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar el semestre académico.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.message_template.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof MessageTemplateError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar el semestre académico.'});
        }
    }
    async findById(req: Request, res: Response) {
        try {
            const message_templates = await this.message_template.findById(res.locals.access, req.params.id);
            res.status(200).json(message_templates);
        } catch (error) {
            if (error instanceof MessageTemplateError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener los semestres académicos.'});
        }
    }
    async findAll(_req: Request, res: Response) {
        try {
            const message_templates = await this.message_template.findAll(res.locals.access);
            res.status(200).json(message_templates);
        } catch (error) {
            if (error instanceof MessageTemplateError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener los semestres académicos.'});
        }
    }
}