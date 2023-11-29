import { Request, Response } from "express";
import { CountryError } from "../../shared/errors";
import { FindAllCountries } from "../../infrastructure/country/country.dao";

export class CountryController {
    async findAll(req: Request, res: Response) {
        try {
            const countries = await FindAllCountries(res.locals.access, req.query.country?.toString());
            res.status(200).json(countries);
        } catch (error) {
            if (error instanceof CountryError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar los países.'});
        }
    }
}