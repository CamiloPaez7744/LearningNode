import express from 'express';
import { envs } from './config';
import { githubController } from './presentation/github/controller';
import { GithubSha256Middleware } from './presentation/middlewares/github-sha256.middleware';


(() => {
    main();
})();

function main() {
    const app = express();
    const controller = new githubController();

    app.use(express.json());

    app.use(GithubSha256Middleware.verifySha256);

    app.post('/api/github', controller.webhookHandler);

    app.listen(envs.PORT, () => {
        console.log(`Server running on port ${envs.PORT}`);
    });
}