"use client"

import { client } from "@/lib/rpc"
import {useMutation} from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>["json"]


function useRegister() {
  const router = useRouter()
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async(json)=> {
      const response = await client.api.auth.register["$post"]({json})

      if (!response.ok) {
        throw new Error("Failed to register")
      }

      return await response.json()
    },
    onSuccess : () => {
      router.refresh()
      toast.success("Registered!")
    },
    onError: () => {
      toast.error("Failed to register")
    }
  })
  return mutation
}

export { useRegister };