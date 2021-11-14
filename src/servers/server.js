const Koa = require('koa');
const koaBodyParser = require('koa-bodyparser');
const { createRouterApp } = require('../routes/router');
const { appConfig } = require('../config/configEnv');
const { initLogger } = require('../config/logging');

let app;

const startApp = async () => {
  const log = initLogger();

  const config = appConfig();

  app = new Koa();

  const router = createRouterApp();

  app.use(async (ctx, next) => {
    ctx.config = config;
    await next();
    return ctx;
  });
  app.use(koaBodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(config.port, () => {
    log.info(`Server running on http://localhost:${config.port}`);
  });

  return app;
};

module.exports = {
  startApp,
};
