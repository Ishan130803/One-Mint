import { getCurrent } from "@/features/auth/actions";
import { SignInCard } from "@/features/auth/components/SignInCard";
import { redirect } from "next/navigation";

async function Page() {
  const user = await getCurrent();
  if (user) redirect("/");
  return <SignInCard></SignInCard>;
} 

export default Page;