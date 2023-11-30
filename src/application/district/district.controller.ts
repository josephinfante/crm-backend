import { Request, Response } from "express";
import { DistrictError } from "../../shared/errors";
import { FindDistrictByCityId } from "../../infrastructure/district/district.dao";

export class DistrictController {
    async findByCityId(req: Request, res: Response) {
        try {
            const districts = await FindDistrictByCityId(req.params.city_id);
            res.status(200).json(districts);
        } catch (error) {
            if (error instanceof DistrictError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar los distritos.'});
        }
    }
}