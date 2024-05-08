import { LogSeverityLevel, type LogEntity } from '../../../src/domain/entities/log.entity';
import { LogRepositoryImpl } from '../../../src/infrastructure/repositories/log.repository.impl';


describe('log-repository', () => {

    const mockDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };

    const LogRepository = new LogRepositoryImpl(mockDataSource);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('saveLog should call the datasource with arguments', async() => {
        const log = {
            level: LogSeverityLevel.low,
            message: 'This is a test log low',
            origin: 'log.repository.impl.test'
        } as LogEntity;

        await LogRepository.saveLog(log);
        expect(mockDataSource.saveLog).toHaveBeenCalledTimes(1);
        expect(mockDataSource.saveLog).toHaveBeenCalledWith(log);
    });

    it('getLogs should call the datasource with arguments', async() => {

        const logSeverity = LogSeverityLevel.low;

        await LogRepository.getLogs(logSeverity);
        expect(mockDataSource.getLogs).toHaveBeenCalledTimes(1);
        expect(mockDataSource.getLogs).toHaveBeenCalledWith(logSeverity);
    });
});