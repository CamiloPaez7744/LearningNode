import { ServerApp } from '../../src/presentation/server-app';
import { CreateTable } from '../../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case';

describe('presentation/server-app', () => {

    const options = {
        base: 5,
        limit: 10,
        showTable: true,
        name: 'test_output.txt',
        destination: 'test_outputs/'
    };

    it('should be created a instance of ServerApp', () => {

        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(ServerApp.run).toBeInstanceOf(Function);
    });

    //integration test
    it('should run ServerApp with options', () => {

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');
        const run = jest.spyOn(ServerApp, 'run');

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('ServerApp running ...');

        expect(createTableSpy).toHaveBeenCalled();
        expect(createTableSpy).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit
        });

        expect(saveFileSpy).toHaveBeenCalled();
        expect(run).toHaveBeenCalledWith(options);

        run.mockRestore();
    });

    it('should run with custom mocks', () => {

        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createTableMock = jest.fn().mockReturnValue('table');
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createTableMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenNthCalledWith(1, 'ServerApp running ...');
        expect(createTableMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect(saveFileMock).toHaveBeenCalledWith({ "destinationPath": "test_outputs/", "fileContent": "table", "fileName": "test_output.txt" });

        expect(logMock).toHaveBeenCalledWith('File was created!');
        expect(logErrorMock).not.toHaveBeenCalled();
    });
});