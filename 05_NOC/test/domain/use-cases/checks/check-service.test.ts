import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { CheckService } from '../../../../src/domain/use-cases/checks/check-service';


describe('CheckService', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
        mockRepository, 
        successCallback, 
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should call successCallback when fetch is successful', async () => {


        const check = await checkService.checkStatus('https://google.com');
        expect(check).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepository.saveLog).toBeCalledWith(
            expect.any(LogEntity)
        );

    });

    it('Should call errorCallback when fetch is unsuccessful', async () => {

        const check = await checkService.checkStatus('https://go78ogle.com');
        expect(check).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepository.saveLog).toBeCalledWith(
            expect.any(LogEntity)
        );

    });

});