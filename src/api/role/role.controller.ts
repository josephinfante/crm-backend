import { Request, Response } from "express";
import { CreateRole } from "./dto/create-role";
import { RoleError } from "../../shared/errors";
import { GetRole } from "./dto/get-role";
import { UpdateRole } from "./dto/update-role";
import { DeleteRole } from "./dto/delete-role";
import { GetAllRoles } from "./dto/get-all-roles";

export async function createRole(req: Request, res: Response) {
    try {
        await CreateRole(req.body);
        res.status(201).json({message: 'El rol ha sido creado.'});
    } catch (error) {
        if (error instanceof RoleError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al crear el rol.'});
    }
}

export async function getRole(req: Request, res: Response) {
    try {
        const role = await GetRole(req.params.id);
        res.status(200).json(role);
    } catch (error) {
        if (error instanceof RoleError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener el rol.'});
    }
}

export async function updateRole(req: Request, res: Response) {
    try {
        await UpdateRole(req.params.id, req.body.name);
        res.status(200).json({message: 'El rol ha sido actualizado.'});
    } catch (error) {
        if (error instanceof RoleError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al actualizar el rol.'});
    }
}

export async function deleteRole(req: Request, res: Response) {
    try {
        await DeleteRole(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof RoleError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al eliminar el rol.'});
    }
}

export async function getAllRoles(_req: Request, res: Response) {
    try {
        const roles = await GetAllRoles();
        res.status(200).json(roles);
    } catch (error) {
        if (error instanceof RoleError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener los roles.'});
    }
}