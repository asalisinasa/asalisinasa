import type { ReactNode } from "react";

import styles from "./terminal-section.module.css";

export interface TerminalSectionProps {
  title: string;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  isHero?: boolean;
}

export function TerminalSection({
  title,
  ariaLabel,
  children,
  className,
  isHero = false
}: TerminalSectionProps) {
  const TitleElement = isHero ? "h1" : "h2";

  return (
    <section
      className={`${styles.section} ${className}`}
      aria-label={ariaLabel}
    >
      <TitleElement className={styles.command} id={title}>
        <span className={styles.icon} aria-hidden="true">
          ▸
        </span>
        <span className={styles.title}>{title}</span>
      </TitleElement>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
