"use client";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";

export const Projects = () => {
  const pathname = usePathname();
  // const projectId = null;
  const { open } = useCreateProjectModal();

  const workspaceId = useWorkspaceId();
  const { data } = useGetProjects({ workspaceId });
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      {data?.documents.map((project) => {
        const href = `/workspace/${workspaceId}/projects/${project.$id}`;
        const isActive = pathname === href;

        return (
          <Link key={project.$id} href={href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <ProjectAvatar image={project.imageUrl} name={project.name} fallbackClassName="rounded-none" />
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

type ProjectAvatarProps = {
  image?: string;
  name: string;
  className?: string;
  fallbackClassName?: string;
};

function ProjectAvatar({
  name,
  className,
  image,
  fallbackClassName,
}: ProjectAvatarProps) {
  if (image) {
    return (
      <div
        className={cn("size-10 relative rounded-sm overflow-hidden", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }
  return (
    <Avatar className={cn("size-8 rounded-md", className)}>
      <AvatarFallback
        className={cn(
          "text-white bg-blue-600 font-semibold text-sm uppercase",
          fallbackClassName
        )}
      >
        {name.charAt(0) ?? "W"}
      </AvatarFallback>
    </Avatar>
  );
}
