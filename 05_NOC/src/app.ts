import { ServerApp } from "./presentation/server";

// Funcion anonima autoinvocada
(async() => {
    await main();
})();

function main() {
    ServerApp.start();
}