import type { Project } from "@/sanity/types";

import styles from "./work-section.module.css";

function projectSlug(project: Project): string {
    return typeof project.slug === "string" ? project.slug : (project.slug?.current ?? "");
}

export function WorkSection({ projects }: { projects: Project[] }) {
    return (
        <section className={styles.section} aria-labelledby="selected-work">
            <h2 className={styles.command} id="selected-work">
                ▸ ls ~/selected-work/
            </h2>

            <div className={styles.grid}>
                {projects.map((project) => (
                    <a
                        key={project.title}
                        className={styles.card}
                        href={`#${projectSlug(project)}`}
                    >
                        <div>
                            <h3 className={styles.cardTitle}>[{project.title}]</h3>
                            <p className={styles.cardDesc}>{project.description}</p>
                        </div>
                        <div className={styles.miniTags} aria-hidden="true">
                            {project.tags?.map((tag) => (
                                <span key={tag} className={styles.miniTag}>
                                    {tag}
                                </span>
                            ))}
                            {project.accentTags?.map((tag) => (
                                <span
                                    key={tag}
                                    className={`${styles.miniTag} ${styles.miniTagPink}`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
