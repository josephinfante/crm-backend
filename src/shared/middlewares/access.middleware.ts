import { NextFunction, Request, Response } from "express";
import { jwtVerify, JWTVerifyOptions } from 'jose';
import { JWT_SECRET } from "../../../globals";
import { GetPermissionsByRoleId } from "../../infrastructure/permission/permission.dao";
import { UserModel } from "../models";

const secretKey: Uint8Array = new TextEncoder().encode(JWT_SECRET);

type PermissionType = 'create' | 'read' | 'update' | 'delete';

async function verifyAccess(components: string[], permissionType: PermissionType, req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers['x-user-token'] as string;
        if (!token) {
            res.status(401).json({ error: 'Access denied. No token provided.' });
            return;
        }
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
        if (user.super_admin) {
            // If user is super admin, allow the request
            res.locals.role_id = user.role_id;
            res.locals.access = {
                user_id: payload.id,
                user_name: `${user.first_name} ${user.last_name}`,
                super_admin: user.super_admin,
                role_name: 'super admin',
                permission: {
                    create: true,
                    read: true,
                    update: true,
                    delete: true,
                    read_all: true,
                    read_deleted: true,
                },
            };
            next();
            return;
        }
        if (user.role_id !== null) {
            for (const component_name of components) {
                if (component_name === 'menu') {
                    component_permission = {
                        permissions: {
                            create: false,
                            read: true,
                            update: false,
                            delete: false,
                            read_all: false,
                            read_deleted: false,
                        }
                    }
                } else {
                    permissions = await GetPermissionsByRoleId(user.role_id);
                    component_permission = permissions.find(permission => permission.name === component_name);
                }

                if (component_permission && component_permission.permissions[permissionType] === true) {
                    // If permission is granted for any component, allow the request
                    res.locals.role_id = user.role_id;
                    res.locals.access = {
                        user_id: payload.id,
                        user_name: `${user.first_name} ${user.last_name}`,
                        super_admin: user.super_admin,
                        role_name: payload.role ?? '',
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
                    return;
                }
            }
        }

        if (payload.exp && typeof payload.exp === 'number' && payload.exp < Date.now() / 1000) {
            res.status(401).json({ error: "Token is expired." });
            return;
        }

        // If no component has the required permission, send a 401 response
        res.status(401).json({ error: "Access denied. User doesn't have permission." });
    } catch (error: any) {
        res.status(401).json({ error: error.message || 'Access denied. Invalid token.' });
    }
}

export class Access {
    static canCreate(components: string[]) {
        return async (req: Request, res: Response, next: NextFunction) => {
            await verifyAccess(components, 'create', req, res, next);
        };
    }

    static canRead(components: string[]) {
        return async (req: Request, res: Response, next: NextFunction) => {
            await verifyAccess(components, 'read', req, res, next);
        };
    }

    static canUpdate(components: string[]) {
        return async (req: Request, res: Response, next: NextFunction) => {
            await verifyAccess(components, 'update', req, res, next);
        };
    }

    static canDelete(components: string[]) {
        return async (req: Request, res: Response, next: NextFunction) => {
            await verifyAccess(components, 'delete', req, res, next);
        };
    }
}