const Router = require('koa-router');
const { sendMessages, saveMessageKafka } = require('../services/serviceImpl');

const createRouterApp = () => {
  const router = new Router();
  router.get('/publisher-kafka/example', sendMessages);
  router.post('/publisher-kafka/save', saveMessageKafka);
  return router;
};

module.exports = {
  createRouterApp,
};
