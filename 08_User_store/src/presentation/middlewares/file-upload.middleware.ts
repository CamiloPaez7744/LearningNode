import type { NextFunction, Request, Response } from "express";
import type { UploadedFile } from "express-fileupload";



export class FileUploadMiddleware {

    static containsFile = (req: Request, res: Response, next: NextFunction) => {


        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send({error:'No files were uploaded.'});
        }

        if (!Array.isArray(req.files.file)) {
            req.body.files = [req.files.file];
        } else {
            req.body.files = req.files.file;
        }

        next();
    }

  static singleFileUpload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file as UploadedFile;

    if (Array.isArray(file)) {
      return res.status(400).send('Only one file is allowed.');
    }

    next();
  }

  static multipleFilesUpload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const files = req.files.file as UploadedFile[];

    if (!Array.isArray(files)) {
      return res.status(400).send('Multiple files are required.');
    }

    next();
  }
}