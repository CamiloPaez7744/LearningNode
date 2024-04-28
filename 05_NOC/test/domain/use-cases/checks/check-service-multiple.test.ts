import { LogEntity } from "../../../../src/domain/entities/log.entity";
import { CheckServiceMultiple } from "../../../../src/domain/use-cases/checks/check-service-multiple";


describe('CheckServiceMultiple', () => {

    const mockRepository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const mockRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const mockRepository3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkServiceMultiple = new CheckServiceMultiple(
        [mockRepository1, mockRepository2, mockRepository3], 
        successCallback, 
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should call successCallback when fetch is successful', async () => {


        const check = await checkServiceMultiple.checkStatus('https://google.com');
        expect(check).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepository1.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepository2.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepository3.saveLog).toBeCalledWith(expect.any(LogEntity));

    });

    it('Should call errorCallback when fetch is unsuccessful', async () => {

        const check = await checkServiceMultiple.checkStatus('https://go78ogle.com');
        expect(check).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepository1.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepository2.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepository3.saveLog).toBeCalledWith(expect.any(LogEntity));

    });

});