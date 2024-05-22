import { envs } from "../../config";



export class DiscordService {

    private readonly DISCORD_WEBHOOK_URL: string = envs.DISCORD_WEBHOOK_URL;

    constructor() {
    }
    
    async notify(message: string): Promise<boolean>{
        
        const body = {
            content: message,
            // embeds: [
            //     {
            //         image: {
            //             url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3hzZWoxNDdyczY4OTV1OHdxZmp0NmtrbXFpbHE0NHRjMDUzNW9hMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3rzxS7NLgvRwUyuy7t/giphy-downsized-large.gif'
            //         }
            //     }
            // ]
        };

        const resp = await fetch(this.DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!resp.ok) {
            throw new Error(`Failed to notify discord: ${resp.statusText}`);
        }

        return true;
    }
}