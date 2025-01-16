import { getCurrent } from "@/features/auth/queries";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

type ProjectIdSettingsPageProps = {
  params: {
    projectId: string;
    workspaceId: string;
  };
};
async function ProjectIdSettingsPage({
  params: { projectId },
}: ProjectIdSettingsPageProps) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getProject({
    projectId,
  });
  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={initialValues} />
    </div>
  );
}

export default ProjectIdSettingsPage;
