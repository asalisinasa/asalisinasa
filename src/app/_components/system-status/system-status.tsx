import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/ui/container";
import { ThemeToggle } from "@/ui/theme";
import { LayoutWindow } from "@/widgets-ui/layout-window";
import { TerminalSection } from "@/widgets-ui/terminal-section";

import styles from "./system-status.module.css";

export type SystemStatusCode = 404 | 500;

export interface SystemStatusProps {
  code: SystemStatusCode;
  message: string;
  detail?: string;
  digest?: string;
  children?: ReactNode;
}

export function SystemStatus({
  code,
  message,
  detail,
  digest,
  children
}: SystemStatusProps) {
  const title = `exit ${code}`;

  return (
    <Container>
      <LayoutWindow>
        <LayoutWindow.Header>
          <ThemeToggle />
        </LayoutWindow.Header>
        <LayoutWindow.Main>
          <TerminalSection
            title={title}
            ariaLabel={`HTTP ${code}: ${message}`}
            className={styles.section}
            isHero
          >
            <p className={styles.line}>
              <span className={styles.strong}>{message}</span>
            </p>
            {detail ? <p className={styles.detail}>{detail}</p> : null}
            {digest ? (
              <p className={styles.digest} suppressHydrationWarning>
                digest: {digest}
              </p>
            ) : null}
            {children ? <div className={styles.actions}>{children}</div> : null}
          </TerminalSection>
        </LayoutWindow.Main>
      </LayoutWindow>
    </Container>
  );
}

export function SystemStatusLink({
  href,
  children
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={styles.action}>
      <span className={styles.prompt} aria-hidden="true">
        $
      </span>
      <span className={styles.label}>{children}</span>
    </Link>
  );
}

export function SystemStatusButton({
  onClick,
  children
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" className={styles.action} onClick={onClick}>
      <span className={styles.prompt} aria-hidden="true">
        $
      </span>
      {children}
    </button>
  );
}
