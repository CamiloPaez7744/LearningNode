import { NextFunction, Request, Response } from "express";



export class TypeMiddleware {

    static checkType ( validTypes: string[]) {

        return (req: Request, res: Response, next: NextFunction) => {
            const type = req.url.split('/')[2] ?? '';

            if(!type || !validTypes.includes(type)){
                return res.status(400).json({error: `Invalid type ${type}, valid types are ${validTypes.join(', ')}`});
            }

            next();
        }
    }
}
