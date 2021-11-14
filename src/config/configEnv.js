const appConfig = () => ({
  topic: process.env.TOPIC,
  port: process.env.PORT || 3000,
});

module.exports = {
  appConfig,
};
