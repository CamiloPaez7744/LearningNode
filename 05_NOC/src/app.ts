import { envs } from "./config/plugins/envs.plugin";
import { ServerApp } from "./presentation/server";

// Funcion anonima autoinvocada
(async() => {
    await main();
})();

function main() {
    ServerApp.start();
    // console.log(envs.PORT)
}