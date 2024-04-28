import { LogDataSource } from '../../../src/domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';


describe('log.datasource', () => {

    const newLog = new LogEntity({
        origin: 'test',
        message: 'test',
        level: LogSeverityLevel.low
    });

    class MockLogDatasource implements LogDataSource {

        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }

    }

    it('should test the abstract class', async () => {
        const mockLogDatasource = new MockLogDatasource();

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
        expect(mockLogDatasource).toHaveProperty('saveLog');
        expect(mockLogDatasource).toHaveProperty('getLogs');

        await mockLogDatasource.saveLog(newLog);
        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.low);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
        expect(logs[0]).toEqual(newLog);
    });
});