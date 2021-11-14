const { default: axios } = require('axios');
const { publisherMessages } = require('./publisher');
const { initLogger } = require('../config/logging');

const sendMessages = async (ctx) => {
  const log = initLogger();

  try {
    const resp = await axios.get('https://rickandmortyapi.com/api/character');
    const messageToString = JSON.stringify(resp.data);

    const messageId = await publisherMessages(ctx.config.topic, messageToString);

    log.info({ event: resp.data }, 'Message published in pubsub');

    ctx.response.status = 200;
    ctx.response.body = {
      messageId,
      message: 'message published in pubsub',
    };
  } catch (error) {
    console.log(error)
    ctx.response.status = 500;
    ctx.response.body = {
      message: error.message,
    };
  }

  return ctx;
};

const saveMessageKafka = async (ctx) => {
  const log = initLogger();
  log.info({ body: ctx.request.body }, 'request received');

  try {
    const messageToString = JSON.stringify(ctx.request.body);

    const messageId = await publisherMessages(ctx.config.topic, messageToString);

    log.info({ event: ctx.request.body }, 'event published in kafka');

    ctx.response.status = 200;
    ctx.response.body = {
      messageId,
      message: 'message published in pubsub',
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      message: error.message,
    };
  }

  return ctx;
};

module.exports = {
  sendMessages,
  saveMessageKafka,
};
