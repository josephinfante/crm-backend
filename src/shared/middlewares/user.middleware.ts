import { NextFunction, Request, Response } from "express";
import { jwtVerify, JWTVerifyOptions } from 'jose';
import { JWT_SECRET } from "../../../globals";
const secretKey: Uint8Array = new TextEncoder().encode(JWT_SECRET);

export async function isUserAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers['x-user-token'] as string;
        if (!token) throw new Error('Access denied. No token provided.');

        // Verify the JWT token
        const options: JWTVerifyOptions = {
            algorithms: ['HS256'],
        };
        const { payload } = await jwtVerify(token, secretKey, options);

        if (payload.exp && typeof payload.exp === 'number' && payload.exp < Date.now() / 1000) {
            res.status(401).json({ error: "Token is expired." });
            return;
        }
        if ((req.params.id !== payload.id) && payload.role !== 'admin') {
            res.status(401).json({ error: "Access denied. Token and ID doesn't match" });
            return;
        }
        next();
    } catch (error: any) {
        res.status(401).json({ error: error.message || 'Access denied. Invalid token.' });
    }
}

