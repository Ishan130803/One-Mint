"use client";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type useGetTaskProps = {
  taskId: string;
};

function useGetTask({ taskId }: useGetTaskProps) {
  const query = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await client.api.tasks[":taskId"].$get({
        param: {
          taskId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch single task");
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
}

export { useGetTask };
