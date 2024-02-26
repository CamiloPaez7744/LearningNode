import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const args = yargs(hideBin(process.argv))
    .options({
        base: {
            alias: 'b',
            type: 'number',
            demandOption: true,
            describe: 'Base of the multiplication table',
        },
        limit: {
            alias: 'l',
            type: 'number',
            default: 10,
            describe: 'Limit of the multiplication table',
        },
        show: {
            alias: 's',
            type: 'boolean',
            default: false,
            describe: 'Show the multiplication table in the console',
        },
        name: {
            alias: 'n',
            type: 'string',
            default: 'output.txt',
            describe: 'Name of the file to save the multiplication table',
        },
        destination: {
            alias: 'd',
            type: 'string',
            default: 'outputs/',
            describe: 'Destination of the file to save the multiplication table',
        }
    }).parseSync();
