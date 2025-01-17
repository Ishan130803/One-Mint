"use client";
import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.tasks)[":taskId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.tasks)[":taskId"]["$delete"]
>;

function useDeleteTask() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.tasks[":taskId"]["$delete"]({ param });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      return await response.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", data.$id] });
      toast.success("Task Deleted");
      // router.refresh();
    },
    onError: () => {
      toast.error("Failed to delete Task");
    },
  });
  return mutation;
}

export { useDeleteTask };
