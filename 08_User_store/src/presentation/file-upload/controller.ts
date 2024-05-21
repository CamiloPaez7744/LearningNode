import { Request, Response } from "express";
import { CustomError } from "../../domain";
import type { FileUploadService } from "../services";
import type { UploadedFile } from "express-fileupload";



export class FileUploadController {
    //DI
    constructor(
        private readonly fileUploadService: FileUploadService
    ) {
    }

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message});
        }
        res.status(500).json({error: 'An error occurred'});
    }

    uploadFile = (req: Request, res: Response) =>{

        const type = req.params.type;
        const file = req.body.files.at(0) as UploadedFile;

        this.fileUploadService.uploadFile(file, `uploads/${type}`)
        .then(uploaded => res.status(201).json({message: 'File uploaded successfully', uploaded}))
        .catch(error => this.handleError(error, res));
        
    }

    uploadMultipleFiles = (req: Request, res: Response) =>{
        const type = req.params.type;
        const files = req.body.files as UploadedFile[];

        this.fileUploadService.uploadMultipleFiles(files, `uploads/${type}`)
        .then(uploaded => res.status(201).json({message: 'File uploaded successfully', uploaded}))
        .catch(error => this.handleError(error, res));
    }

}