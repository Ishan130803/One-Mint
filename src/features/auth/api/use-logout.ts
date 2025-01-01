import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;

function useLogout() {
  const queryCient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout["$post"]();
      if (!response.ok) {
        throw new Error("Failed to logout")
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Logged Out");
      router.refresh();
      queryCient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });
  return mutation;
}

export { useLogout };

