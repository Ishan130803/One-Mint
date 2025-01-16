import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

async function WorkspaceIdPage() {
  const user = await getCurrent()

  if (!user) redirect("/sign-in")
  
  return (
    <div>
      workspace
    </div>
  );
}

export default WorkspaceIdPage;