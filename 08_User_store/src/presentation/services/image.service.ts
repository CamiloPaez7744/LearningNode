import path from "path";
import fs from "fs";
import { CustomError } from "../../domain";


export class ImageService {
    constructor() {}
    
    async getImage(type: string, image: string): Promise<string> {
        const imagePath = path.resolve(__dirname, `../../../uploads/${type}/${image}`);
        if( !fs.existsSync(imagePath) ) {
            throw CustomError.notFound('Image not found');
        } else {
            return imagePath;
        }
    }
}