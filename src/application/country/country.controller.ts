import { Request, Response } from "express";
import { CountryError } from "../../shared/errors";
import { CountryCrudUseCase } from "./use-cases/country-crud.usecase";

export class CountryController {
    private country: CountryCrudUseCase;
    constructor(country: CountryCrudUseCase) {
        this.country = country;
    }
    async create(req: Request, res: Response) {
        try {
            const country = await this.country.create(res.locals.access, req.body);
            res.status(201).json(country);
        } catch (error) {
            if (error instanceof CountryError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear el país.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const country = await this.country.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(country);
        } catch (error) {
            if (error instanceof CountryError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar el país.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.country.delete(res.locals.access, req.params.id);
            res.status(200).json({ message: response });
        } catch (error) {
            if (error instanceof CountryError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar el país.'});
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const countries = await this.country.findAll(res.locals.access, req.query.country?.toString());
            res.status(200).json(countries);
        } catch (error) {
            if (error instanceof CountryError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar los países.'});
        }
    }
}