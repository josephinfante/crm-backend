import { Request, Response } from "express";
import { CreatePermission } from "./dto/create-permission";
import { PermissionError } from "../../shared/errors";
import { GetPermission } from "./dto/get-permission";
import { UpdatePermission } from "./dto/update-permission";
import { DeletePermission } from "./dto/delete-permission";
import { GetAllPermissions } from "./dto/get-all-permissions";

export async function createPermission(req: Request, res: Response) {
    try {
        await CreatePermission(req.body);
        res.status(201).json({ message: 'El permiso ha sido creado.' });
    } catch (error) {
        if (error instanceof PermissionError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al crear el permiso.'});
    }
}

export async function getPermission(req: Request, res: Response) {
    try {
        const permission = await GetPermission(req.params.id);
        res.status(200).json(permission);
    } catch (error) {
        if (error instanceof PermissionError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener el permiso.'});
    }
}

export async function updatePermission(req: Request, res: Response) {
    try {
        await UpdatePermission(req.params.id, req.body);
        res.status(200).json({message: 'El permiso ha sido actualizado.'});
    } catch (error) {
        if (error instanceof PermissionError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al actualizar el permiso.'});
    }
}

export async function deletePermission(req: Request, res: Response) {
    try {
        await DeletePermission(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof PermissionError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al eliminar el permiso.'});
    }
}

export async function getAllPermissions(_req: Request, res: Response) {
    try {
        const permissions = await GetAllPermissions();
        res.status(200).json(permissions);
    } catch (error) {
        if (error instanceof PermissionError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener los permisos.'});
    }
}