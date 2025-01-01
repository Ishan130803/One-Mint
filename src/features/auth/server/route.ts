import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, signUpSchema } from "../schema";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";
import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono()
  .get("/current", sessionMiddleware,async (c) => {
    const user = c.get("user")
    return c.json({data : user})
  })
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return c.json({ "success" : true });
  })
  .post("/register", zValidator("json", signUpSchema), async (c) => {
    const { account } = await createAdminClient();

    const { email, name, password } = c.req.valid("json");
    await account.create(ID.unique(), email, password, name);

    const session = await account.createEmailPasswordSession(email, password);
 
    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return c.json({ "success" : true });
  })
  .post("/logout",sessionMiddleware, async (c) => {
    deleteCookie(c, AUTH_COOKIE);
    const account = c.get('account')
    await account.deleteSession("current")
    return c.json({ success: true });
  });

export default app;
