import { Request, Response } from "express";
import { FindAllComponents, FindComponentById } from "../../infrastructure/component/component.dao";
import { ComponentError } from "../../shared/errors";

export class ComponentController {
    async findById(req: Request, res: Response) {
        try {
            const component = await FindComponentById(req.params.id);
            res.status(200).json(component);
        } catch (error) {
            if (error instanceof ComponentError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener el componente.'});
        }
    }
    async findAll(_req: Request, res: Response) {
        try {
            const response = await FindAllComponents();
            res.status(200).json(response);
        } catch (error) {
            if (error instanceof ComponentError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener los componentes.'});
        }
    }
}