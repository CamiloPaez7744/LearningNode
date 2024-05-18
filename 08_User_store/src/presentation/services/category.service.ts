import { CategoryModel } from "../../data";
import { CustomError, type CreateCategoryDto, type PaginationDto, type UserEntity } from "../../domain";



export class CategoryService {

    constructor() {}

    async createCategory(category: CreateCategoryDto, user: UserEntity): Promise<any> {

        const categoryExist = await CategoryModel.findOne({ name: category.name });
        if (categoryExist) throw CustomError.badRequest('Category already exist');

        try {
            const newCategory = new CategoryModel({
                ...category,
                user: user.id,
            });

            await newCategory.save();

            return {
                id: newCategory.id,
                name: newCategory.name,
                available: newCategory.available,
            };
        } catch (error) {
            throw CustomError.internal(`Error creating category: ${error}`);
        }

    }

    async getCategories( paginationDto: PaginationDto): Promise<any> {

        const { page, limit } = paginationDto;

        try {

            // const totalCategories = await CategoryModel.countDocuments({ available: true });
            // const categories = await CategoryModel.find({ available: true })
            // .skip((page - 1) * limit)
            // .limit(limit);

            //simultaneous requests
            const [totalCategories, categories] = await Promise.all([
                CategoryModel.countDocuments({ available: true }),
                CategoryModel.find({ available: true })
                .skip((page - 1) * limit)
                .limit(limit)
            ]);

            return {
                page,
                limit,
                total: totalCategories,
                next:  `/api/categories?page=${(page + 1)}&limit=${limit}`,
                prev: (page -1 > 0) ? `/api/categories?page=${(page - 1)}&limit=${limit}`: null,
                categories:

                categories.map(category => ({
                    id: category.id,
                    name: category.name,
                    available: category.available,
                }))
            }
            
        } catch (error) {
            throw CustomError.internal(`Error getting categories: ${error}`);
        }
    }
}