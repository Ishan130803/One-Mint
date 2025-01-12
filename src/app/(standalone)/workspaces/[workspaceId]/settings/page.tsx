import { getCurrent } from "@/features/auth/queries";
import { getWorkspace } from "@/features/workspaces/queries";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";

type WorkspaceIdSettingspageProps = {
  params: {
    workspaceId: string;
  };
};

async function WorkspaceIdSettingspage({
  params,
}: WorkspaceIdSettingspageProps) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  const workspaceId = params.workspaceId;

  const initialValues = await getWorkspace({ workspaceId });

  if (!initialValues) {
    redirect(`/workspaces/${params.workspaceId}`);
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
}

export default WorkspaceIdSettingspage;
