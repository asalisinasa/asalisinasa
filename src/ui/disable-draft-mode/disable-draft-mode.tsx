"use client";

import type { ReactNode } from "react";
import { useDraftModeEnvironment } from "next-sanity/hooks";

import styles from "./disable-draft-mode.module.css";

export function DisableDraftMode(): ReactNode {
  const environment = useDraftModeEnvironment();

  // Only show outside Presentation Tool (standalone live preview / unknown).
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

  return (
    <form className={styles.root} action="/api/draft-mode/disable" method="get">
      <button className={styles.button} type="submit">
        Disable Draft Mode
      </button>
    </form>
  );
}
