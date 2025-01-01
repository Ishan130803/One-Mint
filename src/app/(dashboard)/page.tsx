import { getCurrent } from "@/features/auth/actions";
import { UserButton } from "@/features/auth/components/user-button";
import { redirect } from "next/navigation";

async function Home() {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")
    
  return <div>
    <UserButton></UserButton>
  </div>;
}

export default Home;