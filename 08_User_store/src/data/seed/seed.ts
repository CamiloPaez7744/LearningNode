import { envs } from "../../config"
import { CategoryModel, MongoDatabase, ProductModel, UserModel } from "../mongo";
import { seedData } from "./data";

(async () => {
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    })

    await main();

    await MongoDatabase.disconnect();
})();


const randomBetween = (x: number, y: number) => Math.floor(Math.random() * (y - x + 1) + x);


async function main() {
    await Promise.all([
        UserModel.deleteMany({}),
        CategoryModel.deleteMany({}),
        ProductModel.deleteMany({}),
    ]);

    const user = await UserModel.insertMany(seedData.users);
    const category = await CategoryModel.insertMany(seedData.categories.map(category => ({ ...category, user: user[randomBetween(0, user.length - 1)]._id })));
    const products = await ProductModel.insertMany(seedData.products.map(product => {
        return {
            ...product,
            user: user[randomBetween(0, user.length - 1)]._id,
            category: category[randomBetween(0, category.length - 1)]._id,
        }
    }));

}