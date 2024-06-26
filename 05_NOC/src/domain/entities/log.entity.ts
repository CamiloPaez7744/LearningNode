export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}


export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt?: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { level, message, createdAt = new Date(), origin } = options;
        this.level = level;
        this.message = message;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson(json: string): LogEntity {
        const { message, level, createdAt, origin } = JSON.parse(json);

        if (!message || !level || !createdAt || !origin) {
            throw new Error('Invalid JSON');
        }

        return new LogEntity({
            level,
            message,
            createdAt,
            origin
        });
    }

    static fromObject(obj: any): LogEntity {
        const { message, level, createdAt = new Date(), origin } = obj;

        if (!message || !level || !createdAt || !origin) {
            throw new Error('Invalid object');
        }

        return new LogEntity({
            level,
            message,
            createdAt: new Date(createdAt),
            origin
        });
    }

}