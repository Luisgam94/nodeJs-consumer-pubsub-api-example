const { PubSub } = require('@google-cloud/pubsub');
const { initLogger } = require('../config/logging');

const publisherMessages = async (topicName, data) => {
  const log = initLogger();

  // Creates a client; cache this for further use
  const pubSubClient = new PubSub();

  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data);

  const message = {
    data: dataBuffer,
  };

  const messageId = await pubSubClient
    .topic(topicName)
    .publishMessage(message);

  return messageId;
};

module.exports = {
  publisherMessages,
};
