import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route"

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/auth", auth)


app.get("/hello", (c) => {
  return c.json({ hello: "hello" });
});
export const POST = handle(app)
export const GET = handle(app);

export type AppType = typeof routes
