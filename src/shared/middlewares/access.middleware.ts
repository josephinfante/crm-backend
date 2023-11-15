import { NextFunction, Request, Response } from "express";
import { jwtVerify, JWTVerifyOptions } from 'jose';
import { User } from "../../shared/schemas";
import { JWT_SECRET } from "../../../globals";
import { GetPermissionsByRoleId } from "../../api/permission/dto/get-permissions-by-role-id";

const secretKey: Uint8Array = new TextEncoder().encode(JWT_SECRET);
export class Access {
    static canCreate(component_name: string) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const token = req.headers['x-user-token'] as string;
                const options: JWTVerifyOptions = {
                    algorithms: ['HS256'],
                };
                const { payload } = await jwtVerify(token, secretKey, options);
                const user = await User.findOne({where: {id: payload.id}});
                if (!user) throw new Error('Access denied. User not found.');
                const permissions = await GetPermissionsByRoleId(user.dataValues.role_id);
                const opportunity_permission = permissions.find(permission => permission.component.name === component_name);
                if (payload.exp && typeof payload.exp === 'number' && payload.exp < Date.now() / 1000) {
                    res.status(401).json({ error: "Token is expired." });
                    return;
                }
                if ((req.params.id !== payload.id) && payload.role !== 'admin') {
                    res.status(401).json({ error: "Access denied. Token doesn't belong to user." });
                    return;
                }
                if (opportunity_permission && opportunity_permission.create !== true) {
                    res.status(401).json({ error: "Access denied. User doesn't have permission to create opportunities." });
                    return;
                }
                res.locals.id = payload.id;
                next();
            } catch (error: any) {
                res.status(401).json({ error: error.message || 'Access denied. Invalid token.' });
            }
        }
    }
    static canRead(component_name: string) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const token = req.headers['x-user-token'] as string;
                const options: JWTVerifyOptions = {
                    algorithms: ['HS256'],
                };
                const { payload } = await jwtVerify(token, secretKey, options);
                const user = await User.findOne({where: {id: payload.id}});
                if (!user) throw new Error('Access denied. User not found.');
                const permissions = await GetPermissionsByRoleId(user.dataValues.role_id);
                const opportunity_permission = permissions.find(permission => permission.component.name === component_name);
                if (payload.exp && typeof payload.exp === 'number' && payload.exp < Date.now() / 1000) {
                    res.status(401).json({ error: "Token is expired." });
                    return;
                }
                if ((req.params.id !== payload.id) && payload.role !== 'admin') {
                    res.status(401).json({ error: "Access denied. Token doesn't belong to user." });
                    return;
                }
                if (opportunity_permission && opportunity_permission.read !== true) {
                    res.status(401).json({ error: "Access denied. User doesn't have permission to create opportunities." });
                    return;
                }
                res.locals.id = payload.id;
                next();
            } catch (error: any) {
                res.status(401).json({ error: error.message || 'Access denied. Invalid token.' });
            }
        }
    }
    static canUpdate(component_name: string) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const token = req.headers['x-user-token'] as string;
                const options: JWTVerifyOptions = {
                    algorithms: ['HS256'],
                };
                const { payload } = await jwtVerify(token, secretKey, options);
                const user = await User.findOne({where: {id: payload.id}});
                if (!user) throw new Error('Access denied. User not found.');
                const permissions = await GetPermissionsByRoleId(user.dataValues.role_id);
                const opportunity_permission = permissions.find(permission => permission.component.name === component_name);
                if (payload.exp && typeof payload.exp === 'number' && payload.exp < Date.now() / 1000) {
                    res.status(401).json({ error: "Token is expired." });
                    return;
                }
                if ((req.params.id !== payload.id) && payload.role !== 'admin') {
                    res.status(401).json({ error: "Access denied. Token doesn't belong to user." });
                    return;
                }
                if (opportunity_permission && opportunity_permission.update !== true) {
                    res.status(401).json({ error: "Access denied. User doesn't have permission to create opportunities." });
                    return;
                }
                res.locals.id = payload.id;
                next();
            } catch (error: any) {
                res.status(401).json({ error: error.message || 'Access denied. Invalid token.' });
            }
        }
    }
    static canDelete(component_name: string) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const token = req.headers['x-user-token'] as string;
                const options: JWTVerifyOptions = {
                    algorithms: ['HS256'],
                };
                const { payload } = await jwtVerify(token, secretKey, options);
                const user = await User.findOne({where: {id: payload.id}});
                if (!user) throw new Error('Access denied. User not found.');
                const permissions = await GetPermissionsByRoleId(user.dataValues.role_id);
                const opportunity_permission = permissions.find(permission => permission.component.name === component_name);
                if (payload.exp && typeof payload.exp === 'number' && payload.exp < Date.now() / 1000) {
                    res.status(401).json({ error: "Token is expired." });
                    return;
                }
                if ((req.params.id !== payload.id) && payload.role !== 'admin') {
                    res.status(401).json({ error: "Access denied. Token doesn't belong to user." });
                    return;
                }
                if (opportunity_permission && opportunity_permission.create !== true) {
                    res.status(401).json({ error: "Access denied. User doesn't have permission to create opportunities." });
                    return;
                }
                res.locals.id = payload.id;
                next();
            } catch (error: any) {
                res.status(401).json({ error: error.message || 'Access denied. Invalid token.' });
            }
        }
    }
}