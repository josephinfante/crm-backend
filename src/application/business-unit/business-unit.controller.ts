import { Request, Response } from "express";
import { BusinessUnitCrudUseCase } from "./use-cases/business-unit-crud.usecase";
import { BusinessUnitError } from "../../shared/errors";

export class BusinessUnitController {
    private business_unit: BusinessUnitCrudUseCase;
    constructor(business_unit: BusinessUnitCrudUseCase) {
        this.business_unit = business_unit;
    }
    async create(req: Request, res: Response) {
        try {
            const business_unit = await this.business_unit.create(res.locals.access, req.body);
            res.status(201).json(business_unit);
        } catch (error) {
            if (error instanceof BusinessUnitError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear la unidad de negocio.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const business_unit = await this.business_unit.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(business_unit);
        } catch (error) {
            if (error instanceof BusinessUnitError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar la unidad de negocio.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.business_unit.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof BusinessUnitError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar la unidad de negocio.'});
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const business_units = await this.business_unit.findAll(res.locals.access, req.query.business_unit?.toString());
            res.status(200).json(business_units);
        } catch (error) {
            if (error instanceof BusinessUnitError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener las unidades de negocio.'});
        }
    }
}