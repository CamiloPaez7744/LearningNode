import fs from 'fs';
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = './logs';
    private readonly allLogsPath = 'logs/logs-low.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath = 'logs/logs-high.log'

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach(path => {
            if (fs.existsSync(path)) return;

            fs.writeFileSync(path, '');
        });
    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logJson = `${JSON.stringify(newLog)}\n`;

        fs.appendFileSync(this.allLogsPath, logJson);

        if (newLog.level === LogSeverityLevel.low) return;

        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logJson);
        } else {
            fs.appendFileSync(this.highLogsPath, logJson);
        }

    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        if (!content || content === '') return [];
        const logs = content.split('\n').map((log) => {
            try {
                return LogEntity.fromJson(log);
            } catch (error) {
                return null;
            }
        }).filter((log) => log !== null);

        return logs as LogEntity[];
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`${severityLevel} is not a valid severity level`);
        }
    }
}