import fs from 'fs';
import path from 'path';
import { FileSystemDataSource } from '../../../src/infrastructure/datasources/file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';


describe('file-system.datasource', () => {

    const logPath = path.join(__dirname, '../../../logs');

    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true });
    });

    it('should create a log file if not exists', async() => {
        new FileSystemDataSource();
        const files = fs.readdirSync(logPath);
        expect(files).toHaveLength(3);
        expect(files).toEqual(['logs-high.log', 'logs-low.log', 'logs-medium.log']);

    });

    it('should save a log in low logs file', async() => {
        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'This is a test log low',
            origin: 'file-system.datasource.test'
        });

        logDatasource.saveLog(log);
        const lowLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
        expect(lowLogs).toContain(JSON.stringify(log));
    });

    it('should save a log in medium logs file', async() => {
        const logDatasource = new FileSystemDataSource();
        const logMedium = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'This is a test log medium',
            origin: 'file-system.datasource.test'
        });

        logDatasource.saveLog(logMedium);
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
        expect(mediumLogs).toContain(JSON.stringify(logMedium));
    });

    it('should save a log in high logs file', async() => {
        const logDatasource = new FileSystemDataSource();
        const logHigh = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'This is a test log high',
            origin: 'file-system.datasource.test'
        });

        logDatasource.saveLog(logHigh);
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
        expect(highLogs).toContain(JSON.stringify(logHigh));
    });

    it('should return all logs', async() => {
        const logDatasource = new FileSystemDataSource();
        const logLow = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'This is a test log low',
            origin: 'file-system.datasource.test'
        });
        const logMedium = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'This is a test log low',
            origin: 'file-system.datasource.test'
        });
        const logHigh = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'This is a test log low',
            origin: 'file-system.datasource.test'
        });

        await logDatasource.saveLog(logLow);
        await logDatasource.saveLog(logMedium);
        await logDatasource.saveLog(logHigh);

        const logsLow = logDatasource.getLogs(LogSeverityLevel.low);
        const logsMedium = logDatasource.getLogs(LogSeverityLevel.medium);
        const logsHigh = logDatasource.getLogs(LogSeverityLevel.high);

        expect(logsLow).toEqual([logLow]);
        expect(logsMedium).toEqual([logMedium]);
        expect(logsHigh).toEqual([logHigh]);
        
    });

    it('should not throw an error if logs file does not exists', async() => {
        new FileSystemDataSource();
        new FileSystemDataSource();

        expect(true).toBeTruthy();
    });

    it('should throw an error if severity level is not valid', async() => {

        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            level: 'invalid' as LogSeverityLevel,
            message: 'This is a test log low',
            origin: 'file-system.datasource.test'
        });

        const customLog = 'SUPER_CUSTOM_LOG' as LogSeverityLevel;

        try {
            await logDatasource.getLogs(customLog);
            expect(true).toBeFalsy();
        } catch (error) {
            const errorMessage = `${error}`;
            expect(errorMessage).toContain('SUPER_CUSTOM_LOG not implemented');
        }
    });
});