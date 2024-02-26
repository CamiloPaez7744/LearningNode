import { args } from './config/plugins/args.plugins';
import { ServerApp } from './presentation/server-app';

(async () => {
  await main();
})();

async function main() {
  const { base, limit, show, name, destination } = args;
  ServerApp.run({ base, limit, showTable: show, name, destination });
}

