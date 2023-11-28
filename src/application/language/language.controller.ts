import { Request, Response } from "express";
import { LanguageCrudUseCase } from "./use-cases/language-crud.usecase";
import { LanguageError } from "../../shared/errors";

export class LanguageController {
    private language: LanguageCrudUseCase;
    constructor(language: LanguageCrudUseCase) {
        this.language = language;
    }
    async create(req: Request, res: Response) {
        try {
            const language = await this.language.create(res.locals.access, req.body);
            res.status(201).json(language);
        } catch (error) {
            if (error instanceof LanguageError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear el idioma.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const language = await this.language.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(language);
        } catch (error) {
            if (error instanceof LanguageError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar el idioma.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.language.delete(res.locals.access, req.params.id);
            res.status(200).json({ message: response });
        } catch (error) {
            if (error instanceof LanguageError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar el idioma.'});
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const languages = await this.language.findAll(res.locals.access, req.query.language?.toString());
            res.status(200).json(languages);
        } catch (error) {
            if (error instanceof LanguageError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar los idiomas.'});
        }
    }
}