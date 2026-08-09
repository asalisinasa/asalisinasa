import type { SkillGroup } from "@/sanity/types";
import { TerminalSection } from "@/components/terminal-section";

import styles from "./skills-section.module.css";

export function SkillsSection({ groups }: { groups: SkillGroup[] }) {
    return (
        <TerminalSection title="ls ~/skills/" ariaLabel="Skills section">
            <ul className={styles.list}>
                {groups.map((group) => (
                    <li key={group.title} className={styles.item}>
                        <p className={styles.label}>{group.title}</p>
                        <ul className={styles.tags} aria-label={`${group.title} skills`}>
                            {group.skills?.map((skill) => (
                                <li key={skill} className={`${styles.tag} ${styles.tagGleen}`}>
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
