"use client";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type useGetTasksProps = {
  workspaceId: string;
};

function useGetTasks({ workspaceId }: useGetTasksProps) {
  const query = useQuery({
    queryKey: ["tasks", workspaceId],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: { workspaceId },
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
