import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";



describe('log.entity', () => {
    
    const dataObject = {
        origin: 'Logtest',
        message: 'this is a test log',
        level: LogSeverityLevel.low
    };

    it('should test the log entity', async () => {


        const newLog = new LogEntity(dataObject);


        expect(newLog).toBeInstanceOf(LogEntity);
        expect(newLog).toHaveProperty('origin');
        expect(newLog).toHaveProperty('message');
        expect(newLog).toHaveProperty('level');
        expect(newLog.origin).toBe(dataObject.origin);
        expect(newLog.message).toBe(dataObject.message);
        expect(newLog.level).toBe(dataObject.level);
        expect(newLog.createdAt).toBeInstanceOf(Date);

    });

    it('should create a logEntity instance from json', async () => {

        const json = `{"level":"low","message":"Service https://google.com is up","createdAt":"2024-04-10T00:12:00.809Z,"origin":"CheckService"}`

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log).toHaveProperty('origin');
        expect(log).toHaveProperty('message');
        expect(log).toHaveProperty('level');

    });

    it('should create a logEntity instance from object', async () => {

        const log = LogEntity.fromObject(dataObject);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log).toHaveProperty('origin');
        expect(log).toHaveProperty('message');
        expect(log).toHaveProperty('level');

    });
});