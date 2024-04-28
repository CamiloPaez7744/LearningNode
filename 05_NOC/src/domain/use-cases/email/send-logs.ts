import type { EmailService } from "../../../presentation/email/email.service";
import { LogSeverityLevel } from "../../entities/log.entity";
import type { LogRepository } from "../../repository/log-repository";

interface SendEmailLogUseCase {
    execute(to: string | string[]): Promise<boolean>
}

export class SendEmailLogs implements SendEmailLogUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ) {

    }

    async execute(to: string | string[]): Promise<boolean> {

        try {
            const sent = this.emailService.sendEmailWithFileSystemLogs(to);
            if (!sent) {
                throw new Error('Error sending email');
            }

            const log = {
                level: LogSeverityLevel.low,
                message: `Email sent to ${to} with logs`,
                origin: 'sendEmailLogs',
            }
            this.logRepository.saveLog(log);

            return true;
        } catch (error) {
            const log = {
                level: LogSeverityLevel.high,
                message: `Error sending email: ${error}`,
                origin: 'sendEmailLogs',
            }
            this.logRepository.saveLog(log);
            return false;
        }
    }
}