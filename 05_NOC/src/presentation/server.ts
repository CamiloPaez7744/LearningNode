import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


//Instancia de filesystemDataSource
const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);
const emailService = new EmailService();

export class ServerApp {
    static start() {
        console.log('Server started');

        // todo: envio de email
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute('paezcamilo3@gmail.com')

        // emailService.sendEmailWithFileSystemLogs('paezcamilo3@gmail.com');


        // CronService.createJob('*/5 * * * * *', () => {

        //     new CheckService(
        //         fileSystemLogRepository,
        //         () => {
        //             console.log('Service is up');
        //         },
        //         (error) => {
        //             console.error(error);
        //         }
        //     ).checkStatus('https://google.com');
        //     // new CheckService().checkStatus('http://localhost:3000/posts');
        //     console.log('Cron job executed');
        // });
    }
}