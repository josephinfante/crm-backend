import { Request, Response } from "express";
import { CreateSemester } from "./dto/create-semester";
import { SemesterError } from "../../shared/errors";
import { GetSemester } from "./dto/get-semester";
import { UpdateSemester } from "./dto/update-semester";
import { DeleteSemester } from "./dto/delete-semester";
import { GetAllSemesters } from "./dto/get-all-semesters";

export async function createSemester(req: Request, res: Response) {
    try {
        await CreateSemester(req.body);
        res.status(201).json({message: "El semestre académico ha sido creado."});
    } catch (error) {
        if (error instanceof SemesterError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al crear el semestre académico.'});
    }
}

export async function getSemester(req: Request, res: Response) {
    try {
        const semester = await GetSemester(req.params.id);
        res.status(200).json(semester);
    } catch (error) {
        if (error instanceof SemesterError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener el semestre académico.'});
    }
}

export async function updateSemester(req: Request, res: Response) {
    try {
        await UpdateSemester(req.params.id, req.body);
        res.status(200).json({message: 'El semestre académico ha sido actualizado.'});
    } catch (error) {
        if (error instanceof SemesterError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al actualizar la sede.'});
    }
}

export async function deleteSemester(req: Request, res: Response) {
    try {
        await DeleteSemester(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof SemesterError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al eliminar el semestre académico.'});
    }
}

export async function getAllSemesters(_req: Request, res: Response) {
    try {
        const semesters = await GetAllSemesters();
        res.status(200).json(semesters);
    } catch (error) {
        if (error instanceof SemesterError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener los semestres académicos.'});
    }
}