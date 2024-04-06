import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case';
import fs, { mkdir } from 'fs';

describe('SaveFileUseCase', () => {

    const customOptions = {
        fileContent: 'Custom value!',
        destinationPath: 'test/outputs/',
        fileName: 'custom'
    };
    
    const customFilePath = `${customOptions.destinationPath}${customOptions.fileName}.txt`;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // afterEach(() => {
    //     const outputsExist = fs.existsSync('test/outputs');
    //     if (outputsExist) fs.rmSync('test/outputs', { recursive: true })

    //     const customOutputsExist = fs.existsSync(customOptions.destinationPath);
    //     if (customOutputsExist) fs.rmSync('test/outputs', { recursive: true })

    // });

    it('should save a file', () => {
        const saveFile = new SaveFile();
        const filePath = 'test/outputs/test.txt';
        const options = {
            fileContent: 'Hello World!',
            destinationPath: 'test/outputs/',
            fileName: 'test'
        };

        const result = saveFile.execute(options);

        const fileExist = fs.existsSync(filePath);
        // const fileContent = fs.readFileSync(filePath, 'utf-8');
        
        expect( result ).toBe( true );
        expect( fileExist ).toBe( true );
        // expect( fileContent ).toBe( options.fileContent );
    });

    it('should save a file with custom values', () => {
        const saveFile = new SaveFile();
        
        const result = saveFile.execute(customOptions);

        const fileExist = fs.existsSync(customFilePath);
        // const fileContent = fs.readFileSync(filePath, 'utf-8');
        
        expect( result ).toBe( true );
        expect( fileExist ).toBe( true );
        // expect( fileContent ).toBe( options.fileContent );
    });

    it('should generate a exception when creating directory', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdir').mockImplementation(() => {
            throw new Error('Error');
        });

        expect(() => {
            saveFile.execute(customOptions);
        }).toThrow('Error');

        mkdirSpy.mockRestore();

    });

    it('should generate an exception when writing file', () => {
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFile').mockImplementation(() => {
            throw new Error('Error');
        });

        expect(() => {
            saveFile.execute({ fileContent: 'Hello Rock!'});;
        }).toThrow('Error');

        writeFileSpy.mockRestore();
    });
    
});