import { Request, Response } from "express";
import { PageError } from "../../shared/errors";
import { CreatePage } from "./dto/create-page";
import { GetPage } from "./dto/get-page";
import { UpdatePage } from "./dto/update-page";
import { DeletePage } from "./dto/delete-page";
import { GetAllPages } from "./dto/get-all-pages";
import { GetPagesByRoleName } from "./dto/get-pages-by-role-name";

export async function createPage(req: Request, res: Response) {
    try {
        await CreatePage(req.body);
        res.status(201).json({message: 'La página ha sido creada.'});
    } catch (error) {
        if (error instanceof PageError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al crear la página.'});
    }
}

export async function getPage(req: Request, res: Response) {
    try {
        const page = await GetPage(req.params.id);
        res.status(200).json(page);
    } catch (error) {
        if (error instanceof PageError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener la página.'});
    }
}

export async function updatePage(req: Request, res: Response) {
    try {
        await UpdatePage(req.params.id, req.body);
        res.status(200).json({message: 'La página ha sido actualizada.'});
    } catch (error) {
        if (error instanceof PageError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al actualizar la página.'});
    }
}

export async function deletePage(req: Request, res: Response) {
    try {
        await DeletePage(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof PageError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al eliminar la página.'});
    }
}

export async function getAllPages(_req: Request, res: Response) {
    try {
        const pages = await GetAllPages();
        res.status(200).json(pages);
    } catch (error) {
        if (error instanceof PageError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener las páginas.'});
    }
}

export async function getPagesByRoleName(req: Request, res: Response) {
    try {
        const pages = await GetPagesByRoleName(req.params.role_name);
        res.status(200).json(pages);
    } catch (error) {
        if (error instanceof PageError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener las páginas.'});
    }
}