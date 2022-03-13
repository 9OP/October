import Router from "koa-router";
import { searchNumber } from "./service";
import { StatusCodes } from "http-status-codes";

export const router = new Router({ prefix: "/api" });

router.get("/", async (ctx, next) => {
  const company = String(ctx.request.query["company"] || "");
  const postalCode = String(ctx.request.query["postal_code"] || "");

  if (!company) {
    ctx.throw(StatusCodes.BAD_REQUEST, "missing 'company' query parameter");
  }

  let number;
  try {
    number = await searchNumber(company, postalCode);
  } catch {
    ctx.throw(StatusCodes.BAD_REQUEST, `${company} number not found`);
  }

  if (!number) {
    ctx.throw(StatusCodes.BAD_REQUEST, `${company} number not found`);
  }

  ctx.body = { number };
  await next();
});
