import { Request, Response } from "express";
import { CreateContact } from "./dto/create-contact";
import { ContactError } from "../../shared/errors";
import { GetContact } from "./dto/get-contact";
import { UpdateContact } from "./dto/update-contact";
import { DeleteContact } from "./dto/delete-contact";
import { GetAllContacts } from "./dto/get-all-contacts";

export async function createContact(req: Request, res: Response) {
    try {
        await CreateContact(req.body);
        res.status(201).json({ message: "El contacto ha sido creado." });
    } catch (error) {
        if (error instanceof ContactError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al crear el contacto.'});
    }
}

export async function getContact(req: Request, res: Response) {
    try {
        const contact = await GetContact(req.params.id);
        res.status(200).json(contact);
    }   catch (error) {
        if (error instanceof ContactError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener el contacto.'});
    }
}

export async function updateContact(req: Request, res: Response) {
    try {
        await UpdateContact(req.params.id, req.body);
        res.status(200).json({message: 'El contacto ha sido actualizado.'});
    } catch (error) {
        if (error instanceof ContactError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al actualizar el contacto.'});
    }
}

export async function deleteContact(req: Request, res: Response) {
    try {
        await DeleteContact(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof ContactError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al eliminar el contacto.'});
    }
}

export async function getAllContacts(req: Request, res: Response) {
    try {
        const contacts = await GetAllContacts(Number(req.query.page??1));
        res.status(200).json(contacts);
    } catch (error) {
        if (error instanceof ContactError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener los contactos.'});
    }
}