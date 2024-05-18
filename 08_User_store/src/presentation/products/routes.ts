import { Router } from "express";
import { ProductController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductService } from "../services";



export class ProductRoutes {
  static get routes(): Router {
    const router = Router();
    const productService = new ProductService();
    const controller = new ProductController(productService);

    // Define routes
    router.get('/', controller.getProducts);
    router.post('/', [AuthMiddleware.authenticate], controller.createProduct);

    return router;
  }
}