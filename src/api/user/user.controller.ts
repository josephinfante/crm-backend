import { Request, Response } from "express";
import loginUser from "./auth/login-user";
import { CreateUser } from "./dto/create-user";
import { UserError } from "../../shared/errors";
import { GetUser } from "./dto/get-user";
import { UpdateUser } from "./dto/update-user";
import { DeleteUser } from "./dto/delete-user";
import { GetAllUsers } from "./dto/get-all-users";

export async function createUser(req: Request, res: Response) {
    try {
        await CreateUser(req.body);
        res.status(201).json({message: 'El usuario ha sido creado.'});
    } catch (error) {
        if (error instanceof UserError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al crear al ususario.'});
    }
}

export async function getUser(req: Request, res: Response) {
    try {
        const user = await GetUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof UserError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener al usuario.'});
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        await UpdateUser(req.params.id, req.body);
        res.status(200).json({message: 'El usuario ha sido actualizado.'});
    } catch (error) {
        if (error instanceof UserError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al actualizar al usuario.'});
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        await DeleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof UserError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al eliminar al usuario.'});
    }
}

export async function getAllUsers(req: Request, res: Response) {
    try {
        const response = await GetAllUsers(Number(req.query.page??1));
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: 'Ha ocurrido un error al obtener los usuarios.'});
    }
}

async function login(req: Request, res: Response) {
    try {
        const response = await loginUser(req.body);
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof UserError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al loguearse.'});
    }
}

export { login };