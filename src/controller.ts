import Router from "koa-router";
import LRUCache from "lru-cache";
import { searchNumber } from "./service";

const cache = new LRUCache({ max: 256 });

export const router = new Router({ prefix: "/api" });

router.get("/", async (ctx, next) => {
  const company = String(ctx.request.query["company"] || "");
  const postalCode = String(ctx.request.query["postal_code"] || "");

  if (!company) {
    ctx.throw("missing 'company' query parameter", 400);
  }

  let number;
  if (cache.get(company)) {
    number = cache.get(company);
  } else {
    try {
      number = await searchNumber(company, postalCode);
      number
        ? cache.set(company, number)
        : ctx.throw(`${company} number not found`, 400);
    } catch (err) {
      ctx.throw(`${company} number not found`, 400);
    }
  }

  ctx.body = { number };
  await next();
});
