import { Request, Response } from "express";
import { CreateOpportunity } from "./dto/create-opportunity";
import { OpportunityError } from "../../shared/errors";
import { GetOpportunity } from "./dto/get-opportunity";
import { UpdateOpportunity } from "./dto/update-opportunity";
import { DeleteOpportunity } from "./dto/delete-opportunity";
import { GetAllOpportunities } from "./dto/get-all-opportunities";

export async function createOpportunity(req: Request, res: Response) {
    try {
        await CreateOpportunity(res.locals.id, req.body);
        res.status(201).json({ message: "La oportunidad ha sido creada." });
    } catch (error) {
        if (error instanceof OpportunityError) res.status(400).json({ error: error.message });
        else res.status(500).json({ error: "Ha ocurrido un error al crear la oportunidad." });
    }
}

export async function getOpportunity(req: Request, res: Response) {
    try {
        const opportunity = await GetOpportunity(req.params.id);
        res.status(200).json(opportunity);
    } catch (error) {
        if (error instanceof OpportunityError) res.status(400).json({ error: error.message });
        else res.status(500).json({ error: "Ha ocurrido un error al obtener la oportunidad." });
    }
}

export async function updateOpportunity(req: Request, res: Response) {
    try {
        await UpdateOpportunity(req.params.id, res.locals.id, req.body);
        res.status(200).json({ message: "La oportunidad ha sido actualizada." });
    } catch (error) {
        if (error instanceof OpportunityError) res.status(400).json({ error: error.message });
        else res.status(500).json({ error: "Ha ocurrido un error al actualizar la oportunidad." });
    }
}

export async function deleteOpportunity(req: Request, res: Response) {
    try {
        await DeleteOpportunity(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof OpportunityError) res.status(400).json({ error: error.message });
        else res.status(500).json({ error: "Ha ocurrido un error al eliminar la oportunidad." });
    }
}

export async function getAllOpportunities(req: Request, res: Response ) {
    try {
        const opportunities = await GetAllOpportunities(Number(req.query.page??1));
        res.status(200).json(opportunities);
    } catch (error) {
        if (error instanceof OpportunityError) res.status(400).json({ error: error.message });
        else res.status(500).json({ error: "Ha ocurrido un error al obtener las oportunidades." });
    }
}