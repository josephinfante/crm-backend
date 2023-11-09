import { Request, Response } from "express";
import { CreateSchool } from "./dto/create-school";
import { SchoolError } from "../../shared/errors";
import { GetSchool } from "./dto/get-school";
import { UpdateSchool } from "./dto/update-school";
import { DeleteSchool } from "./dto/delete-school";
import { GetAllSchools } from "./dto/get-all-schools";

export async function createSchool(req: Request, res: Response) {
    try {
        await CreateSchool(req.body);
        res.status(201).json({message: "La escuela profesional ha sido creada."});
    } catch (error) {
        if (error instanceof SchoolError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al crear la escuela profesional.'});
    }
}

export async function getSchool(req: Request, res: Response) {
    try {
        const school = await GetSchool(req.params.id);
        res.status(200).json(school);
    } catch (error) {
        if (error instanceof SchoolError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener la escuela profesional.'});
    }
}

export async function updateSchool(req: Request, res: Response) {
    try {
        await UpdateSchool(req.params.id, req.body);
        res.status(200).json({message: 'La escuela profesional ha sido actualizada.'});
    } catch (error) {
        if (error instanceof SchoolError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al actualizar la escuela profesional.'});
    }
}

export async function deleteSchool(req: Request, res: Response) {
    try {
        await DeleteSchool(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof SchoolError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al eliminar la escuela profesional.'});
    }
}

export async function getAllSchools(_req: Request, res: Response) {
    try {
        const schools = await GetAllSchools();
        res.status(200).json(schools);
    } catch (error) {
        if (error instanceof SchoolError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener las escuelas profesionales.'});
    }
}