import "server-only";
import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { AUTH_COOKIE } from "@/features/auth/constants";

import {
  Client,
  Account,
  Storage,
  Databases,
  type Account as  AccountType ,
  type Storage as  StorageType ,
  type Databases as  DatabasesType ,
  Models,
} from "node-appwrite";

type MiddlewareType = {
  Variables: {
    account: AccountType;
    databases: DatabasesType;
    storage: StorageType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<MiddlewareType>(async (c, next) => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

  const session = getCookie(c, AUTH_COOKIE);
  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  client.setSession(session);

  const account = new Account(client);
  const databases = new Databases(client);
  const storage = new Storage(client);
  const user = await account.get();

  c.set("account", account);
  c.set("databases", databases);
  c.set("storage", storage);
  c.set("user", user);

  await next();
});
