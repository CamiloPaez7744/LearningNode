import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import type { LogRepository } from "../../repository/log-repository";

interface CheckServiceUseCase {
    checkStatus(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}

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
            this.logRepository.saveLog(log);
            this.successCallback && this.successCallback();

            return true;
        } catch (error) {
            const errorMessage = `${url} is not ok! ${error}`;
            const log = new LogEntity({
                level: LogSeverityLevel.high, 
                message: errorMessage, 
                origin: 'CheckService'});
            this.errorCallback && this.errorCallback(errorMessage);
            this.logRepository.saveLog(log);
            return false;
        }
    }
}