const { environment } = require('@rails/webpacker');

const aliases = require('./custom');

environment.config.merge(aliases);

module.exports = environment;
