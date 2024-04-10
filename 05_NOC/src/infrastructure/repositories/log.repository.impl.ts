import type { LogDataSource } from "../../domain/datasources/log.datasource";
import type { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log-repository";


export class LogRepositoryImpl implements LogRepository {
    
    // private readonly dataSource: LogDataSource;

    // constructor(dataSource: LogDataSource) {
    //     this.dataSource = dataSource;
    // }
    constructor(private readonly dataSource: LogDataSource) {}

    async saveLog(log: LogEntity): Promise<void> {
        await this.dataSource.saveLog(log);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return await this.dataSource.getLogs(severityLevel);
    }
}