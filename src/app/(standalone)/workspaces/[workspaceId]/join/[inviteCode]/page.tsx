import { getCurrent } from "@/features/auth/queries";
import { JoinWorkSpaceForm } from "@/features/workspaces/components/join-workspace-form";
import { getWorkspaceInfo } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";

type WorkspaceIdJoinPageProps = {
  params: {
    inviteCode: string;
    workspaceId: string;
  };
};

async function WorkspaceIdJoinPage({
  params: { workspaceId },
}: WorkspaceIdJoinPageProps) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getWorkspaceInfo({
    workspaceId,
  });

  if (!initialValues) {
    redirect("/");
  }

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkSpaceForm initialValues={initialValues} />
    </div>
  );
}

export default WorkspaceIdJoinPage;
