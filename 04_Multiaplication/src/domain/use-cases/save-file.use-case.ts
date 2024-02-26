import fs from 'fs';

export interface SaveFileUseCase {
    execute: (options: SaveFileOptions ) => boolean;
}

export interface SaveFileOptions {
    fileContent: string;
    destinationPath?: string;
    fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
    constructor() {
        /**
         * DI Dependency Injection
         */
    }

    execute({
        fileContent,
        destinationPath = `outputs/`,
        fileName = `output`
    }: SaveFileOptions): boolean {

        fs.mkdir(destinationPath, { recursive: true }, (err: any) => {
            if (err) throw err;
        });
        fs.writeFile(`${ destinationPath }${ fileName }.txt`, fileContent, (err: any) => {
            if (err) throw err;
            console.log(`${ fileName } has been saved!`);
        });
        return true;
    }
}