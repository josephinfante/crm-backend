import { Request, Response } from "express";
import { RoleCrudUseCase } from "./use-cases/role-crud.usecase";
import { RoleError } from "../../shared/errors";

export class RoleController {
    private role: RoleCrudUseCase;
    constructor(role: RoleCrudUseCase) {
        this.role = role;
    }
    async create(req: Request, res: Response) {
        try {
            const role = await this.role.create(res.locals.access, req.body);
            res.status(201).json(role);
        } catch (error) {
            if (error instanceof RoleError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear el role.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const role = await this.role.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(role);
        } catch (error) {
            if (error instanceof RoleError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar el role.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.role.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof RoleError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar el role.'});
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const roles = await this.role.findAll(res.locals.access, req.query.name?.toString());
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({error: 'Ha ocurrido un error al obtener los usuarios.'});
        }
    }
}