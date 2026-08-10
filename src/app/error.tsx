"use client";

import { useEffect } from "react";

import {
  SystemStatus,
  SystemStatusButton,
  SystemStatusLink
} from "./_components/system-status";

export default function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SystemStatus
      code={500}
      message="unexpected error"
      detail="Something went wrong while rendering this page."
      digest={error.digest}
    >
      <SystemStatusButton onClick={reset}>retry</SystemStatusButton>
      <SystemStatusLink href="/">cd ~/</SystemStatusLink>
    </SystemStatus>
  );
}
