import { Request, Response } from "express";
import { CreateBusinessUnit } from "./dto/create-business-unit";
import { BusinessUnitError } from "../../shared/errors";
import { GetBusinessUnit } from "./dto/get-business-unit";
import { UpdateBusinessUnit } from "./dto/update-business-unit";
import { DeleteBusinessUnit } from "./dto/delete-business-unit";
import { GetAllBusinessUnits } from "./dto/get-all-business-units";

export async function createBusinessUnit(req: Request, res: Response) {
    try {
        await CreateBusinessUnit(req.body);
        res.status(201).json({ message: "La unidad de negocio ha sido creada." });
    } catch (error) {
        if (error instanceof BusinessUnitError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al crear la unidad de negocio.'});
    }
}

export async function getBusinessUnit(req: Request, res: Response) {
    try {
        const business_unit = await GetBusinessUnit(req.params.id);
        res.status(200).json(business_unit);
    } catch (error) {
        if (error instanceof BusinessUnitError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener la unidad de negocio.'});
    }
}

export async function updateBusinessUnit(req: Request, res: Response) {
    try {
        await UpdateBusinessUnit(req.params.id, req.body);
        res.status(200).json({message: 'La unidad de negocio ha sido actualizada.'});
    } catch (error) {
        if (error instanceof BusinessUnitError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al actualizar la unidad de negocio.'});
    }
}

export async function deleteBusinessUnit(req: Request, res: Response) {
    try {
        await DeleteBusinessUnit(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof BusinessUnitError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al eliminar la unidad de negocio.'});
    }
}

export async function getAllBusinessUnits(_req: Request, res: Response) {
    try {
        const business_units = await GetAllBusinessUnits();
        res.status(200).json(business_units);
    } catch (error) {
        if (error instanceof BusinessUnitError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener las unidades de negocio.'});
    }
}