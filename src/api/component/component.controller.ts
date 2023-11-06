import { Request, Response } from "express";
import { CreateComponent } from "./dto/create-component";
import { ComponentError } from "../../shared/errors";
import { GetComponent } from "./dto/get-component";
import { UpdateComponent } from "./dto/update-component";
import { DeleteComponent } from "./dto/delete-component";
import { GetAllComponents } from "./dto/get-all-components";

export async function createComponent(req: Request, res: Response) {
    try {
        await CreateComponent(req.body);
        res.status(201).json({message: 'El componente ha sido creado.'});
    } catch (error) {
        if (error instanceof ComponentError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al crear el componente.'});
    }
}

export async function getComponent(req: Request, res: Response) {
    try {
        const component = await GetComponent(req.params.id);
        res.status(200).json(component);
    } catch (error) {
        if (error instanceof ComponentError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener el componente.'});
    }
}

export async function updateComponent(req: Request, res: Response) {
    try {
        await UpdateComponent(req.params.id, req.body);
        res.status(200).json({message: 'El componente ha sido actualizado.'});
    } catch (error) {
        if (error instanceof ComponentError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al actualizar el componente.'});
    }
}

export async function deleteComponent(req: Request, res: Response) {
    try {
        await DeleteComponent(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof ComponentError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al eliminar el componente.'});
    }
}

export async function getAllComponent(_req: Request, res: Response) {
    try {
        const components = await GetAllComponents();
        res.status(200).json(components);
    } catch (error) {
        if (error instanceof ComponentError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener los componentes.'});
    }
}