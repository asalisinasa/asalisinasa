"use client";

import { useEffect } from "react";

import { ThemeProvider } from "@/ui/theme";

import {
  SystemStatus,
  SystemStatusButton,
  SystemStatusLink
} from "./_components/system-status";

import "./globals.css";

export default function GlobalError({
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SystemStatus
            code={500}
            message="unexpected error"
            detail="Something went wrong."
            digest={error.digest}
          >
            <SystemStatusButton onClick={reset}>retry</SystemStatusButton>
            <SystemStatusLink href="/">cd ~/</SystemStatusLink>
          </SystemStatus>
        </ThemeProvider>
      </body>
    </html>
  );
}
