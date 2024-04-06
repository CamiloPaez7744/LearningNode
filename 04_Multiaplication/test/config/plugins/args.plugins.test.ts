// import { args } from '../../../src/config/plugins/args.plugins';

const runCommand = async (args: string[]) => {

    process.argv = [...process.argv, ...args];

    const yargs = await import('../../../src/config/plugins/args.plugins');

    return yargs.args;
}

describe('args.plugins', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    it('should parse command line arguments correctly', async () => {
        // Mocking process.argv

        const argv = await runCommand(['-b', '5']);

        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'output.txt',
            d: 'outputs/',
        }));
    });

    it('should return configuration with custom values', async() => {

        const argv = await runCommand(['-b', '8', '-l', '20', '-s', '-n', 'custom-name', '-d', 'custom-dir']);

        expect(argv).toEqual(expect.objectContaining({
          b: 8,
          l: 20,
          s: true,
          n: 'custom-name',
          d: 'custom-dir',
        }));

    });
});