import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";



export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();
    const serviceFileUploadService = new FileUploadService();
    const controller = new FileUploadController(serviceFileUploadService);

    router.use([
      FileUploadMiddleware.containsFile,
      TypeMiddleware.checkType(['users', 'products', 'categories'])
    ]);

    router.post('/single/:type', controller.uploadFile);
    router.post('/multiple/:type', controller.uploadMultipleFiles);

    return router;
  }
}