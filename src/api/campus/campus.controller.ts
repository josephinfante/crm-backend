import { Request, Response } from "express";
import { CreateCampus } from "./dto/create-campus";
import { CampusError } from "../../shared/errors";
import { GetCampus } from "./dto/get-campus";
import { UpdateCampus } from "./dto/update-campus";
import { DeleteCampus } from "./dto/delete-campus";
import { GetAllCampuses } from "./dto/get-all-campuses";

export async function createCampus(req: Request, res: Response) {
    try {
        await CreateCampus(req.body);
        res.status(201).json({message: "La sede ha sido creada."});
    } catch (error) {
        if (error instanceof CampusError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al crear la sede.'});
    }
}

export async function getCampus(req: Request, res: Response) {
    try {
        const campus = await GetCampus(req.params.id);
        res.status(200).json(campus);
    } catch (error) {
        if (error instanceof CampusError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener la sede.'});
    }
}

export async function updateCampus(req: Request, res: Response) {
    try {
        await UpdateCampus(req.params.id, req.body);
        res.status(200).json({message: 'La sede ha sido actualizada.'});
    } catch (error) {
        if (error instanceof CampusError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al actualizar la sede.'});
    }
}

export async function deleteCampus(req: Request, res: Response) {
    try {
        await DeleteCampus(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof CampusError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al eliminar la sede.'});
    }
}

export async function getAllCampuses(_req: Request, res: Response) {
    try {
        const campuses = await GetAllCampuses();
        res.status(200).json(campuses);
    } catch (error) {
        if (error instanceof CampusError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener las sedes.'});
    }
}