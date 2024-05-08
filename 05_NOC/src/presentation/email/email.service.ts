import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import type { LogRepository } from '../../domain/repository/log-repository';

export interface SendMailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachments?: Attachments[]
}

export interface Attachments {
    filename: string,
    path: string
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor() {}

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options;

        try {

            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            })

            console.log(sendInformation);

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Hello';
        const htmlBody = '<h3>Logs del sistema </h3>';
        const attachments: Attachments[] = [{
            filename: 'logs-low.log',
            path: './logs/logs-low.log'
        }];

        return this.sendEmail({ to, subject, htmlBody, attachments });
    }


}