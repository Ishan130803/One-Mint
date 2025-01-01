import { getCurrent } from "@/features/auth/actions";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";

async function Home() {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")
    
  return <div className="bg-neutral-500">
    <CreateWorkspaceForm />
  </div>;
}

export default Home;