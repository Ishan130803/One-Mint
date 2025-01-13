"use client";
import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.members)[":memberId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.members)[":memberId"]["$patch"]
>;

function useUpdateMember() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.members[":memberId"].$patch({
        json,
        param,
      });
      if (!response.ok) {
        throw new Error("Failed to update Member");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success("Member Updated!");
    },
    onError: () => {
      toast.error("Failed to update Member");
    },
  });
  return mutation;
}

export { useUpdateMember };
