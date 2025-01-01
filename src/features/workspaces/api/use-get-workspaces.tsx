"use client";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

function useGetWorkspaces() {
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await client.api.workspaces.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch workspaces")
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
}

export { useGetWorkspaces };
