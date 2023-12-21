const { httpClient } = require('./http-client');
const { httpAxios } = require('./http-axios');
const { Uuid } = require('./uuid.plugin');
const buildLogger = require('./logger.plugin');

module.exports = {
    httpClient,
    httpAxios,
    Uuid,
    buildLogger,
    };