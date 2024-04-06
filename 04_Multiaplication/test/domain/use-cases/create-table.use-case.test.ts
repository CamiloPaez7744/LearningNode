import { CreateTable } from '../../../src/domain/use-cases/create-table.use-case';


describe('CreateTableUseCase', () => {

    let createTable: CreateTable;
    beforeEach(() => {
        createTable = new CreateTable();
    });

    it('should create a table with default values', () => {

        const table = createTable.execute({ base: 2 });
        const rows = table.split('\n');

        
        expect(createTable).toBeInstanceOf(CreateTable);
        expect(rows).toHaveLength(13);
    });
    it('should create a table with custom values', () => {
        const table = createTable.execute({ base: 2, limit: 5 });
        const rows = table.split('\n');

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(rows).toHaveLength(8);
    });
    it('should return a string with the multiplication table of 2', () => {
        const result = createTable.execute({ base: 2 });
        expect(result).toBe('========================================\n        Multiplication table of 2\n========================================\n2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n2 x 10 = 20');
    });
});