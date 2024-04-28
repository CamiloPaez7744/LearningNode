import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { LogRepository } from '../../../../src/domain/repository/log-repository';
import { SendEmailLogs } from '../../../../src/domain/use-cases/email/send-logs';


describe('send-logs', () => {
    
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn().mockReturnValue(true),
        getLogs: jest.fn().mockReturnValue([])
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call send email and save log', async() => {
  

        const result = await sendEmailLogs.execute('test@gmail.com');

        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
        expect(mockLogRepository.saveLog).toHaveBeenCalled();
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            level: "low", 
            message: "Email sent to test@gmail.com with logs", 
            origin: "sendEmailLogs"
        });
    });

    it('should log in case error', async() => {
        
        mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);

        const result = await sendEmailLogs.execute('test@gmail.com');

        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
        expect(mockLogRepository.saveLog).toHaveBeenCalled();
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            level: "high", 
            message: "Error sending email: Error: Error sending email", 
            origin: "sendEmailLogs"
        });
    });
});