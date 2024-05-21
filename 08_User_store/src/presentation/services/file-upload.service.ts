import path from "path";
import fs from "fs";
import type { UploadedFile } from "express-fileupload";
import { Uuid } from "../../config";
import { CustomError } from "../../domain";



export class FileUploadService {

    constructor(
        private readonly uuid = Uuid.v4,
    ) {}

    private checkFolderExistence = (folderPath: string) => {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
    }

    async uploadFile(
        file: UploadedFile,
        folderPath: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
    ) {
        try {
            const extension = file.name.split('.').pop();

            if (!extension || !validExtensions.includes(extension)) {
                throw CustomError.badRequest(`Invalid file extension ${extension}`);
            }

            const destination = path.resolve(__dirname, '../../../', folderPath);
            this.checkFolderExistence(destination);

            const fileName = `${this.uuid()}.${extension}`;

            file.mv(`${destination}/${fileName}`);

            return { fileName, extension, destination };
        } catch (error) {
            throw error;
        }
    }

    async uploadMultipleFiles(
        files: UploadedFile[],
        folderPath: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
    ): Promise<any> {
        const filesNames = await Promise.all(
            files.map(async (file) => {
                return await this.uploadFile(file, folderPath, validExtensions);
            })
        );

        return filesNames;
    }
}