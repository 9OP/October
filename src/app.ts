import Koa from "koa";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";

import { router } from "./controller";

const errorHandler = () => {
  return async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
    try {
      await next();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      ctx.status = err?.statusCode || err?.status || 500;
      ctx.body = {
        message: err?.message || "server error",
      };
    }
  };
};

export function createApp() {
  const app = new Koa();

  // Middlewares
  if (process.env["NODE_ENV"] !== "test") {
    app.use(logger());
  }
  app.use(json());
  app.use(bodyParser());
  app.use(errorHandler());

  // Routes
  app.use(router.routes()).use(router.allowedMethods());

  return app;
}
