import { envs } from "./config/plugins/envs.plugin";
import { ServerApp } from "./presentation/server";
import { LogModel, MongoDataBase } from "./data/mongo";
import { Prisma, PrismaClient } from "@prisma/client";

// Funcion anonima autoinvocada
(async() => {
    await main();
})();

async function main() {

    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    const prisma = new PrismaClient();
    const newLog = await prisma.logModel.create({
        data: {
            level: 'LOW',
            message: 'Test de aplicación con prisma',
            origin: 'App.ts'
        }
    });

    console.log({ newLog });

    // const newLog = await LogModel.create({
    //     level: 'low',
    //     message: 'Test de aplicación con mongoose',
    //     origin: 'App.ts'
    // });

    // await newLog.save();
    // console.log(newLog);

    // const logs = await LogModel.find();
    // console.log(logs);
    ServerApp.start();
    // console.log(envs.PORT)
}