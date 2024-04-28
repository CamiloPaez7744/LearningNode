import { envs } from '../../../src/config/plugins/envs.plugin';

describe('envs.plugin', () => {
    it('should return the correct environment', () => {

        expect(envs).toStrictEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'camiloapaezdev@gmail.com',
            MAILER_SECRET_KEY: 'wcauheyfgzeykvpx',
            MONGO_URL: "mongodb://camiloapaezdev:123456@localhost:27017/?authMechanism=DEFAULT",
            MONGO_DB_NAME: 'NOC',
            MONGO_USER: 'camiloapaezdev',
            MONGO_PASS: '123456',
        });
    });

    it('should return error if not found environment', async () => {

        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('../../../src/config/plugins/envs.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toBe(`EnvVarError: env-var: \"PORT\" should be a valid integer`);
        }
    });
});