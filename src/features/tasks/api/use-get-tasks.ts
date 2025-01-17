"use client";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { TaskStatus } from "../types";

type useGetTasksProps = {
  workspaceId: string;
  projectId?: string;
  status?: TaskStatus;
  search?: string;
  assigneeId?: string;
  dueDate?: string;
};

function useGetTasks({
  workspaceId,
  assigneeId,
  dueDate,
  projectId,
  search,
  status,
}: useGetTasksProps) {
  const query = useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      assigneeId,
      search,
      dueDate,
      status,
    ],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: {
          workspaceId,
          assigneeId: assigneeId,
          dueDate: dueDate,
          projectId: projectId,
          search: search,
          status: status,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
}

export { useGetTasks };
