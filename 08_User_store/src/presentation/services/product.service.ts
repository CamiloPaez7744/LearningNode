import { ProductModel } from "../../data";
import { CustomError, CreateProductDto, PaginationDto, } from "../../domain";



export class ProductService {

    constructor() {}

    async createProduct(product: CreateProductDto): Promise<any> {

        const productExist = await ProductModel.findOne({ name: product.name });
        if (productExist) throw CustomError.badRequest('Product already exist');

        try {
            const newProduct = new ProductModel({
                ...product,
            });

            await newProduct.save();

            return product;
        } catch (error) {
            throw CustomError.internal(`Error creating product: ${error}`);
        }
        
    }

    async getProducts(paginationDto: PaginationDto): Promise<any> {

        const { page, limit } = paginationDto;

        try {

            const [totalProducts, products] = await Promise.all([
                ProductModel.countDocuments({ available: true }),
                ProductModel.find({ available: true })
                .skip((page - 1) * limit)
                .limit(limit)
                .populate('user')
                .populate('category')
            ]);

            return {
                page,
                limit,
                total: totalProducts,
                next:  `/api/products?page=${(page + 1)}&limit=${limit}`,
                prev: (page -1 > 0) ? `/api/products?page=${(page - 1)}&limit=${limit}`: null,
                products,
            };
        } catch (error) {
            throw CustomError.internal(`Error getting products: ${error}`);
        }

    }
}