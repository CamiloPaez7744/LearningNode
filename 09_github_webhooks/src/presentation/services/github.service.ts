import type { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";



export class GithubService {

    constructor() {
    }

    onStar(payload: GitHubStarPayload): string {
        const { action, repository, sender, starred_at } = payload;
        const { name, full_name } = repository;
        const { login } = sender;

        if (action === 'created' && starred_at) {
            return `User ${login} has starred the repository ${name} (${full_name}) at ${starred_at}`;
        } else {
            return `User ${login} has ${action} the repository ${name} (${full_name})`;
        }
    }

    onIssue(payload: GitHubIssuePayload): string {
        let message: string;
        const { action, issue, repository, sender } = payload;

        if (action === 'opened') {
            message = `Issue ${issue.title} has been opened by ${sender.login} in ${repository.full_name}`;
            return message;
        }

        if (action === 'closed') {
            message = `Issue ${issue.title} has been closed by ${sender.login} in ${repository.full_name}`;
            return message;
        }

        return `Issue ${issue.title} has been ${action} by ${sender.login} in ${repository.full_name}`;

    }
}
