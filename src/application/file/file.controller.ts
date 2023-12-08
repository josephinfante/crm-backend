import { Request, Response } from "express";
import { FileError } from "../../shared/errors";
import { FileCrudUseCase } from "./use-cases/file-crud.usecase";

export class FileController {
    private file: FileCrudUseCase;
    constructor(file: FileCrudUseCase) {
        this.file = file;
    }
    async upload(req: Request, res: Response) {
        try {
            const static_directory = `${req.protocol}://${req.get("host")}`;
            const files = req.files?.files ?? req.files?.file;

            if (!files) {
                res.status(400).json({ error: 'No hay archivos proporcionados.' });
                return;
            }
            const file_urls = await this.file.upload(files, static_directory);
            res.status(200).json(file_urls);
        } catch (error) {
            if (error instanceof FileError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al subir el archivo.'});
        }
    }
    async delete(req: Request, res: Response) {
        try {
            const urls = req.body.urls ?? req.body.url;
            await this.file.delete(urls);
            res.status(204).send();
        } catch (error) {
            if (error instanceof FileError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar el archivo.'});
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const static_directory = `${req.protocol}://${req.get("host")}`;
            const file_urls = await this.file.findAll(static_directory, Number(req.query.page??1));
            res.status(200).json(file_urls);
        } catch (error) {
            if (error instanceof FileError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al encontrar los archivos.'});
        }
    }
}