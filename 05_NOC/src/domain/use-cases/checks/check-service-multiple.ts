import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log-repository";

interface CheckServiceMultipleUseCase {
    checkStatus(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepositories: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}

    private callLogsRepository (log: LogEntity) {
        this.logRepositories.forEach((repository) => {
            repository.saveLog(log);
        });

    }

    public async checkStatus(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);

            if (!req.ok) {
                throw new Error(`Error checking service: ${url}`);
            }

            const log = new LogEntity({
                level: LogSeverityLevel.low, 
                message: `Service ${url} is up`, 
                createdAt: new Date(),
                origin: 'CheckService'
            });
            this.callLogsRepository(log);
            this.successCallback && this.successCallback();

            return true;
        } catch (error) {
            const errorMessage = `${url} is not ok! ${error}`;
            const log = new LogEntity({
                level: LogSeverityLevel.high, 
                message: errorMessage, 
                origin: 'CheckService'});
            this.errorCallback && this.errorCallback(errorMessage);
            this.callLogsRepository(log);
            return false;
        }
    }
}