"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { RiAddCircleFill } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";

function WorkspaceSwitcher() {
  const { data: workspaces } = useGetWorkspaces();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
      </div>
      <Select>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="No Workspace Selected" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((item) => (
            <SelectItem key={item.$id} value={item.$id}>
              <div className="flex justify-start items-center gap-3 font-medium">
                <WorkspaceAvatar name={item.name} image={item.imageUrl} />
                <span className="truncate">{item.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

type WorkspaceAvatarProps = {
  image?: string;
  name: string;
  className?: string;
};

function WorkspaceAvatar({ name, className, image }: WorkspaceAvatarProps) {
  if (image) {
    return (
      <div
        className={cn("size-10 relative rounded-md overflow-hidden", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }
  return (
    <Avatar className={cn("size-10", className)}>
      <AvatarFallback className="text-white bg-blue-600 font-semibold text-lg uppercase">
        {name.charAt(0) ?? "W"}
      </AvatarFallback>
    </Avatar>
  );
}

export { WorkspaceSwitcher, WorkspaceAvatar };
