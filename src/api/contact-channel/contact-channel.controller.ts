import { Request, Response } from "express";
import { CreateContactChannel } from "./dto/create-contact-channel";
import { ContactChannelError } from "../../shared/errors";
import { GetContactChannel } from "./dto/get-contact-channel";
import { UpdateContactChannel } from "./dto/update-contact-channel";
import { DeleteContactChannel } from "./dto/delete-contact-channel";
import { GetAllContactChannels } from "./dto/get-all-contact-channels";

export async function createContactChannel(req: Request, res: Response) {
    try {
        await CreateContactChannel(req.body);
        res.status(201).json({ message: "El canal de contacto ha sido creado." });
    } catch (error) {
        if (error instanceof ContactChannelError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al crear el canal de contacto.'});
    }
}

export async function getContactChannel(req: Request, res: Response) {
    try {
        const contact_channel = await GetContactChannel(req.params.id);
        res.status(200).json(contact_channel);
    }   catch (error) {
        if (error instanceof ContactChannelError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener el canal de contacto.'});
    }
}

export async function updateContactChannel(req: Request, res: Response) {
    try {
        await UpdateContactChannel(req.params.id, req.body);
        res.status(200).json({message: 'El canal de contacto ha sido actualizado.'});
    } catch (error) {
        if (error instanceof ContactChannelError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al actualizar el canal de contacto.'});
    }
}

export async function deleteContactChannel(req: Request, res: Response) {
    try {
        await DeleteContactChannel(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof ContactChannelError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al eliminar el canal de contacto.'});
    }
}

export async function getAllContactChannels(_req: Request, res: Response) {
    try {
        const contact_channels = await GetAllContactChannels();
        res.status(200).json(contact_channels);
    } catch (error) {
        if (error instanceof ContactChannelError) res.status(400).json({error: error.message});
        else res.status(500).json({error: 'Ha ocurrido un error al obtener los canales de contacto.'});
    }
}