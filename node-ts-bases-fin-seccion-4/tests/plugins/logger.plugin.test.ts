import { buildLogger, logger as winstonLogger } from '../../src/plugins/logger.plugin';

describe('LoggerPlugin', () => {
    it('should return a string', () => {
        const logger = buildLogger('test');
        logger.log('Test');
        logger.error('Error');
    });

    it('should be a function', () => {
        expect(typeof buildLogger).toBe('function');
    });

    it('logger should be an object', () => {
        expect(typeof winstonLogger).toBe('object');
    });

    it('logger.lod should have a log message', () => {
        const winstonMock = jest.spyOn(winstonLogger, 'log');
        const message = 'Test';
        const service = 'testService';

        const logger = buildLogger(service);

        logger.log(message);

        expect(winstonMock).toHaveBeenCalledWith(
            'info',
            expect.objectContaining({
                message,
                service
            }),
        );
    });
});