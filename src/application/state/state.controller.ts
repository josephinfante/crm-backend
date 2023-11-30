import { Request, Response } from "express";
import { FindAllStates } from "../../infrastructure/state/state.dao";
import { StateError } from "../../shared/errors";

export class StateController {
    async findAll(_req: Request, res: Response) {
        try {
            const states = await FindAllStates();
            res.status(200).json(states);
        } catch (error) {
            if (error instanceof StateError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al buscar los departamentos del Perú.'});
        }
    }
}