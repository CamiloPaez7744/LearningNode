import mongoose from "mongoose";
import { envs } from "../../../src/config/plugins/envs.plugin";
import { MongoDataBase } from "../../../src/data/mongo/init";
import { MongoLogDatasource } from "../../../src/infrastructure/datasources/mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";



describe('mongo-log.datasource', () => {

    const logDatasource = new MongoLogDatasource();

    const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'This is a test log',
        origin: 'mongo-log.datasource.test'
    });

    beforeAll(async() => {
        await MongoDataBase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        });
    });

    afterAll(async() => {
        mongoose.connection.close();
    });

    it('should create a log', async() => {

        const logSpy = jest.spyOn(console, 'log');

        await logDatasource.saveLog(log);
        expect(logSpy).toHaveBeenCalledWith('Log saved in mongo');
        expect(logSpy).toHaveBeenCalledWith("Mongo Log created:", expect.any(String));
    });

    it('should get logs', async() => {

        await logDatasource.saveLog(log);

        const logs = await logDatasource.getLogs(LogSeverityLevel.low);

        expect(logs.length).toBe(1);
        expect(logs[0].level).toBe(LogSeverityLevel.low);

    });
});