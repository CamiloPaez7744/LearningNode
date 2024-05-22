import { Request, Response } from 'express';
import { GithubService } from '../services/github.service';
import { DiscordService } from '../services/discord.service';


export class githubController {
    constructor(
        private readonly githubService: GithubService = new GithubService(),
        private readonly discordService: DiscordService = new DiscordService(),
    ) {}

    webhookHandler = (req: Request, res: Response) => {

        const payload = req.body;
        const signature = req.header('x-hub-signature-256')  ?? 'unknown';
        const githubEvent = req.headers['x-github-event']  ?? 'unknown';
        let message: string;

        switch (githubEvent) {
            case 'issues':
                message = this.githubService.onIssue(payload);
                break;
            case 'star':
                message = this.githubService.onStar(payload);
                break;
            default:
                message = `Event ${githubEvent} is not supported`;
        }

        this.discordService.notify(message)
            .then(() => res.status(201).json({message: 'Accepted'}))
            .catch((err) => res.status(500).json({message: err.message}));
        
    }
}