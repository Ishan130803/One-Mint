"use server";

import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";
import { AUTH_COOKIE } from "./constants";
import { redirect } from "next/navigation";

export const getCurrent = async () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    // .setKey(process.env.NEXT_APPWRITE_KEY!);

  const session = cookies().get(AUTH_COOKIE);

  if (!session) return null;

  client.setSession(session.value);

  const account = new Account(client);

  return account.get();
};

export const authCheck = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
};
