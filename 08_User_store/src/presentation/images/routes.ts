import { Router } from "express";
import { ImageController } from "./controller";
import { ImageService } from "../services";



export class ImageRoutes {
    static get routes(): Router {
        const router = Router();
        const serviceImageService = new ImageService();
        const controller = new ImageController(serviceImageService);
    
            
        router.get('/:type/:image', controller.getImage);
    
        return router;
    }
}