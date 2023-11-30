import { Request, Response } from "express";
import { CityError } from "../../shared/errors";
import { FindCitybyStateId } from "../../infrastructure/city/city.dao";

export class CityController {
    async findByStateId(req: Request, res: Response) {
        try {
            const cities = await FindCitybyStateId(req.params.state_id);
            res.status(200).json(cities);
        } catch (error) {
            if (error instanceof CityError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar las provincias.'});
        }
    }
}