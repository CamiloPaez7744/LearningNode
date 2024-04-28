import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


//Instancia de filesystemDataSource
const logRepository = new LogRepositoryImpl(
    // new FileSystemDataSource()
    // new MongoLogDatasource()
    new PostgresLogDatasource()
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
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


        CronService.createJob('*/5 * * * * *', () => {

            new CheckServiceMultiple(
                // logRepository,
                [fileSystemLogRepository, mongoLogRepository, postgresLogRepository],
                () => {
                    console.log('Service is up');
                },
                (error) => {
                    console.error(error);
                }
            ).checkStatus('https://google.com');
            // new CheckService().checkStatus('http://localhost:3000/posts');
            console.log('Cron job executed');
        });
    }
}