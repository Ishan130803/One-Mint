"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/appwrite";

export const getCurrent = async () => {
  try {
    const {account} = await createSessionClient()
    return await account.get()
  } catch {
    return null
  }
};

export const authCheck = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
};
