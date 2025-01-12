"use client";
import { DottedSeparator } from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useRouter } from "next/navigation";

type JoinWorkSpaceFormProps = {
  initialValues: {
    name: string;
  };
};

export const JoinWorkSpaceForm = ({
  initialValues: { name },
}: JoinWorkSpaceFormProps) => {
  const { mutate, isPending } = useJoinWorkspace();
  const inviteCode = useInviteCode();
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaced/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join Workspace</CardTitle>
        <CardDescription>
          {`You've been invited to join `}
          <strong> {name}</strong>
          Workspace
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <div className="flex flex-col gap-2 lg:flex-row items-center justify-between">
          <Button
            className="w-full lg:w-fit"
            variant={"secondary"}
            type="button"
            size={"lg"}
            disabled={isPending}
            asChild
          >
            <Link href={"/"}>Cancel</Link>
          </Button>
          <Button
            className="w-full lg:w-fit"
            variant={"secondary"}
            type="button"
            size={"lg"}
            onClick={onSubmit}
            disabled={isPending}
            asChild
          >
            <Link href={"/"}>Join Workspace</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
