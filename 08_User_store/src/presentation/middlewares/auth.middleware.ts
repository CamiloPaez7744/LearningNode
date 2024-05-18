import type { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";



export class AuthMiddleware {

    static async authenticate(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization');
        if(!authorization) return res.status(401).json({error: 'Unauthorized no token provided'});
        if(!authorization.startsWith('Bearer ')) return res.status(401).json({error: 'Unauthorized invalid token provided'});

        const token = authorization.split(' ').at(1) ?? '';

        try {
            const payload = await JwtAdapter.verifyToken<{id: string}>(token);
            if(!payload) return res.status(401).json({error: 'Unauthorized invalid token provided'});
            
            const user = await UserModel.findById(payload.id);
            if(!user) return res.status(401).json({error: 'Unauthorized invalid token provided'});

            req.body.user = UserEntity.fromObject(user);

            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({error: 'An error occurred'});
        }
    }

}