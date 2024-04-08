import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class ServerApp {
    static start() {
        console.log('Server started');

        CronService.createJob('*/5 * * * * *', () => {

            new CheckService(
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