import { NextFunction, Request, Response } from "express";
import { jwtVerify, JWTVerifyOptions } from 'jose';
import { JWT_SECRET } from "../../../globals";
import { GetPermissionsByRoleId } from "../../infrastructure/permission/permission.dao";
import { UserModel } from "../models";

const secretKey: Uint8Array = new TextEncoder().encode(JWT_SECRET);

type PermissionType = 'create' | 'read' | 'update' | 'delete';

async function verifyAccess(component_name: string, permissionType: PermissionType, req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers['x-user-token'] as string;
        const options: JWTVerifyOptions = {
            algorithms: ['HS256'],
        };
        const { payload } = await jwtVerify(token, secretKey, options);
        const user = await UserModel.findOne({ where: { id: payload.id } }).then(user => user?.dataValues)
        if (!user) {
            throw new Error('Access denied. User not found.');
        }

        let permissions;
        let component_permission;
        if (user.role_id !== null) {
            permissions = await GetPermissionsByRoleId(user.role_id);
            component_permission = permissions.find(permission => permission.name === component_name);
        }

        if (payload.exp && typeof payload.exp === 'number' && payload.exp < Date.now() / 1000) {
            res.status(401).json({ error: "Token is expired." });
            return;
        }

        if (!component_permission && user.super_admin !== true) {
            res.status(401).json({ error: "Acceso denegado. El usuario no tiene ningun permiso." });
            return;
        }

        if ((component_permission && component_permission.permissions[permissionType] !== true) && user.super_admin !== true) {
            res.status(401).json({ error: `Access denied. User doesn't have permission to ${permissionType} opportunities.` });
            return;
        }

        res.locals.role_id = user.role_id;
        res.locals.access = {
            user_id: payload.id,
            super_admin: user.super_admin,
            role_name: payload.role??'',
            permission: {
                create: component_permission?.permissions.create,
                read: component_permission?.permissions.read,
                update: component_permission?.permissions.update,
                delete: component_permission?.permissions.delete,
                read_all: component_permission?.permissions.read_all,
                read_deleted: component_permission?.permissions.read_deleted,
            },
        };

        next();
    } catch (error: any) {
        res.status(401).json({ error: error.message || 'Access denied. Invalid token.' });
    }
}

export class Access {
    static canCreate(component_name: string) {
        return async (req: Request, res: Response, next: NextFunction) => {
            await verifyAccess(component_name, 'create', req, res, next);
        };
    }

    static canRead(component_name: string) {
        return async (req: Request, res: Response, next: NextFunction) => {
            await verifyAccess(component_name, 'read', req, res, next);
        };
    }

    static canUpdate(component_name: string) {
        return async (req: Request, res: Response, next: NextFunction) => {
            await verifyAccess(component_name, 'update', req, res, next);
        };
    }

    static canDelete(component_name: string) {
        return async (req: Request, res: Response, next: NextFunction) => {
            await verifyAccess(component_name, 'delete', req, res, next);
        };
    }
}