import { EmailService, SendMailOptions } from '../../../src/presentation/email/email.service';
import nodemailer from 'nodemailer';

describe('EmailService', () => {

    const mockSendMail = jest.fn();

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    const emailService = new EmailService();

    it('should send an email', async () => {
        const options: SendMailOptions = {
            to: 'test@gmail.com',
            subject: 'Test',
            htmlBody: '<h1>Test</h1>'
        };

        await emailService.sendEmail(options);
        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: "<h1>Test</h1>",
            subject: "Test",
            to: "test@gmail.com",
        });
    });

    it('should send an email with attachments', async () => {
        const email = 'fernando@google.com';
        await emailService.sendEmailWithFileSystemLogs(email);


        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: "Logs del servidor",
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            ])
        });
    });
});