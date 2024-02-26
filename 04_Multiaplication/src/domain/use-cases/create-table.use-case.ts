export interface CreateTableUseCase {
    execute: (options: CreateTableOptions ) => string;
}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase{
    constructor() {
        /**
         * DI Dependency Injection
         */
    }

   execute({ base, limit = 10}: CreateTableOptions): string{

        let data: string = '';
        data += `========================================\n        Multiplication table of ${base}\n========================================\n`;
        for (let i = 1; i <= limit; i++) {
            data += `${base} x ${i} = ${base * i}\n`;
        }
        return data;
    }
}