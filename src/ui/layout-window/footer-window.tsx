import type { ReactNode } from "react";

import styles from "./layout-window.module.css";

export function FooterWindow({ children }: { children: ReactNode }) {
  return <footer className={styles.footer}>{children}</footer>;
}
