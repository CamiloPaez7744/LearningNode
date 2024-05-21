import { Request, Response,} from 'express';
import type { ImageService } from '../services';
import { CustomError } from '../../domain';


export class ImageController {
    constructor(private service: ImageService) {}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message});
        }
        res.status(500).json({error: 'An error occurred'});
    }
    
    getImage = (req: Request, res: Response) => {
        const { type = '', image = '' } = req.params;
        this.service.getImage(type, image)
            .then((imagePath) => {res.status(201).sendFile( imagePath )})
            .catch((error) => this.handleError(error, res));
    }
}