import { Request, Response } from "express";
import { CreateCareer } from "./dto/create-career";
import { CareerError } from "../../shared/errors";
import { GetCareer } from "./dto/get-career";
import { UpdateCareer } from "./dto/update-career";
import { DeleteCareer } from "./dto/delete-career";
import { GetAllCareers } from "./dto/get-all-careers";

export async function createCareer(req: Request, res: Response) {
    try {
        await CreateCareer(req.body);
        res.status(201).json({ message: "La carrera ha sido creada." });
    } catch (error) {
        if (error instanceof CareerError) res.status(400).json({ message: error.message });
        else res.status(500).json({ message: "Ha ocurrido un error al crear la carrera." });
    }
}

export async function getCareer(req: Request, res: Response) {
    try {
        const career = await GetCareer(req.params.id);
        res.status(200).json({ career });
    } catch (error) {
        if (error instanceof CareerError) res.status(400).json({ message: error.message });
        else res.status(500).json({ message: "Ha ocurrido un error al obtener la carrera." });
    }
}

export async function updateCareer(req: Request, res: Response) {
    try {
        await UpdateCareer(req.params.id, req.body);
        res.status(200).json({ message: "La carrera ha sido actualizada." });
    } catch (error) {
        if (error instanceof CareerError) res.status(400).json({ message: error.message });
        else res.status(500).json({ message: "Ha ocurrido un error al actualizar la carrera." });
    }
}

export async function deleteCareer(req: Request, res: Response) {
    try {
        await DeleteCareer(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof CareerError) res.status(400).json({ message: error.message });
        else res.status(500).json({ message: "Ha ocurrido un error al eliminar la carrera." });
    }
}

export async function getAllCareers(_req: Request, res: Response) {
    try {
        const careers = await GetAllCareers();
        res.status(200).json({ careers });
    } catch (error) {
        if (error instanceof CareerError) res.status(400).json({ message: error.message });
        else res.status(500).json({ message: "Ha ocurrido un error al obtener las carreras." });
    }
}