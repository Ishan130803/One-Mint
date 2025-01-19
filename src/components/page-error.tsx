"use client";
import { AlertTriangle } from "lucide-react";

type PageErrorProps = {
  message?: string;
};

function PageError({ message = "Something Went Wrong" }: PageErrorProps) {
  return (
    <div className="h-screen flex flex-col gap-y-4 items-center justify-center">
      <AlertTriangle className="size-6 text-amber-700" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

export default PageError;
