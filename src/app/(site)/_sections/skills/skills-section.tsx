import type { SkillGroup } from "@/sanity/types";

import styles from "./skills-section.module.css";

export function SkillsSection({ groups }: { groups: SkillGroup[] }) {
    return (
        <section className={styles.section} aria-labelledby="skills">
            <h2 className={styles.command} id="skills">
                ▸ ls ~/skills/
            </h2>

            {groups.map((group) => (
                <div key={group.title}>
                    <p className={styles.label}>{group.title}</p>
                    <div className={styles.tags} aria-label={`${group.title} skills`}>
                        {group.skills?.map((skill) => (
                            <span
                                key={skill}
                                className={`${styles.tag} ${group.tone === "pink" ? styles.tagPink : ""}`}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}
