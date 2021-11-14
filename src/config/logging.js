const Pino = require('pino');

const initLogger = () => Pino({
  enabled: true,
  level: 'debug',
});

module.exports = {
  initLogger,
}