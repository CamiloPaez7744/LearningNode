import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";


//Instancia de filesystemDataSource
const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);

export class ServerApp {
    static start() {
        console.log('Server started');

        // envio de email


        CronService.createJob('*/5 * * * * *', () => {

            new CheckService(
                fileSystemLogRepository,
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