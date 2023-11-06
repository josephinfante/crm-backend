import { NextFunction, Request, Response } from "express";
import { jwtVerify, JWTVerifyOptions } from 'jose';
import { User } from "../../shared/schemas";
import { JWT_SECRET } from "../../../globals";

const secretKey: Uint8Array = new TextEncoder().encode(JWT_SECRET);

export async function isAdminAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers['x-user-token'] as string;
        if (!token) throw new Error('Access denied. No token provided.');

        const options: JWTVerifyOptions = {
            algorithms: ['HS256'],
        };
        const { payload } = await jwtVerify(token, secretKey, options);
        const user = await User.findOne({where: {id: payload.id}});
        if (!user) throw new Error('Access denied. User not found.');

        if (payload.exp && typeof payload.exp === 'number' && payload.exp < Date.now() / 1000) {
            res.status(401).json({ error: "Token is expired." });
            return;
        }
        if (user.dataValues.id !== payload.id || payload.role !== 'admin') {
            res.status(401).json({ error: "Access denied. Only admins can access this resource." });
            return;
        }
        next();
    } catch (error: any) {
        res.status(401).json({ error: error.message || 'Access denied. Invalid token.' });
    }
}