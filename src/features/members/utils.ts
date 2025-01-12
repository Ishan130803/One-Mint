import { DATABASE_ID, MEMBER_ID } from "@/config";
import { Databases, Query } from "node-appwrite";

type GetMemberProps = {
  databases: Databases;
  workspaceId: string;
  userId: string;
};

export const getMember = async ({
  databases,
  userId,
  workspaceId,
}: GetMemberProps) => {
  const members = await databases.listDocuments(DATABASE_ID, MEMBER_ID, [
    Query.equal("workspaceId", workspaceId),
    Query.equal("userId", userId),
  ]);

  return members.documents[0]
};
