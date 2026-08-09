import {
  TerminalSection,
  type TerminalSectionProps
} from "@/ui/terminal-section";

import styles from "./section-terminal-hero.module.css";

export interface SectionTerminalHeroProps extends Omit<
  TerminalSectionProps,
  "children"
> {
  name: string;
  role: string;
}

export function SectionTerminalHero({
  title = "whoami",
  ariaLabel = "",
  name,
  role
}: SectionTerminalHeroProps) {
  return (
    <TerminalSection title={title} ariaLabel={ariaLabel} isHero>
      <p className={styles.line}>
        <span className={styles.strong}>{name}</span> —{" "}
        <span className={styles.role}>{role}</span>
      </p>
    </TerminalSection>
  );
}
