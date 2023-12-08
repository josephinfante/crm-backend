import { Request, Response } from "express";
import { ConnectError } from "../../shared/errors";

export class ConnectController {
    async webhook(req: Request, res: Response) {
        try {
            console.log(req.body);
            res.status(200).json({message: 'ok'});
        } catch (error) {
            if (error instanceof ConnectError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al guardar la data del connect.'});
        }
    }
}