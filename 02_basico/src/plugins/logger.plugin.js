const winston = require('winston');
const { combine, timestamp, label, printf } = winston.format;

const logger = winston.createLogger({
    
    level: 'info',
    format: combine(
        label({ label: 'pokemon-api' }),
        timestamp(),
        printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${label}] ${level}: ${message}`;
        }),
    ),
    defaultMeta: { service: 'pokemon-api' },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
});

module.exports = function buildLogger(service){
    return {
        info: (message) => logger.info(message, { service , timestamp: new Date()}),
        error: (message) => logger.error(message, { service, at: new Date().toISOString() }),
    }
};