import { Request, Response } from "express";
import { UserCrudUseCase } from "./use-cases/user-crud.usecase";
import { UserError } from "../../shared/errors";

export class UserController {
    private user: UserCrudUseCase;
    constructor(user: UserCrudUseCase) {
        this.user = user;
    }
    async create(req: Request, res: Response) {
        try {
            const user = await this.user.create(res.locals.access, req.body);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof UserError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al crear al ususario.'});
        }
    }
    async update(req: Request, res: Response) {
        try {
            const user = await this.user.update(res.locals.access, req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof UserError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al actualizar al usuario.'});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.user.delete(res.locals.access, req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof UserError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al eliminar al usuario.'});
        }
    }
    async findById(req: Request, res: Response) {
        try {
            const user = await this.user.findById(res.locals.access, req.params.id);
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof UserError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al obtener al usuario.'});
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const response = await this.user.findAll(res.locals.access, Number(req.query.page??1));
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: 'Ha ocurrido un error al obtener los usuarios.'});
        }
    }
    async login(req: Request, res: Response) {
        try {
            const login = await this.user.login(req.body.email, req.body.password);
            res.status(200).json(login);
        } catch (error) {
            if (error instanceof UserError) res.status(400).json({error: error.message});
            else res.status(500).json({error: 'Ha ocurrido un error al iniciar sesión.'});
        }
    }
}