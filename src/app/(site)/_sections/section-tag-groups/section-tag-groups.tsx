import type { SkillGroup } from "@/sanity/types";
import {
  TerminalSection,
  type TerminalSectionProps
} from "@/widgets-ui/terminal-section";

import styles from "./section-tag-groups.module.css";

export interface SectionTagGroupsProps extends Omit<
  TerminalSectionProps,
  "children"
> {
  groups: SkillGroup[];
}

export function SectionTagGroups({
  title = "ls ~/skills/",
  ariaLabel = "Skills section",
  groups
}: SectionTagGroupsProps) {
  return (
    <TerminalSection title={title} ariaLabel={ariaLabel}>
      <ul className={styles.list}>
        {groups.map((group) => (
          <li key={group._key ?? group.title} className={styles.item}>
            <p className={styles.label}>{group.title}</p>
            <ul className={styles.tags} aria-label={`${group.title} skills`}>
              {group.skills?.map((skill) => (
                <li
                  key={skill}
                  className={
                    group.tone === "pink"
                      ? `${styles.tag} ${styles.tagPink}`
                      : styles.tag
                  }
                >
                  {skill}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </TerminalSection>
  );
}
