import type { Project } from "@/sanity/types";
import { TerminalSection } from "@/ui/terminal-section";

import styles from "./work-section.module.css";

function projectSlug(project: Project): string {
  return typeof project.slug === "string"
    ? project.slug
    : (project.slug?.current ?? "");
}

export function WorkSection({
  title = "ls ~/selected-work/",
  projects
}: {
  title?: string;
  projects: Project[];
}) {
  return (
    <TerminalSection title={title} ariaLabel="Selected work">
      <ul className={styles.grid}>
        {projects.map((project) => (
          <li key={project.title}>
            <a
              className={styles.card}
              href={`#${projectSlug(project)}`}
              aria-label={project.title}
            >
              <div>
                <h3 className={styles.cardTitle}>[{projectSlug(project)}]</h3>
                <p className={styles.cardDesc}>{project.description}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </TerminalSection>
  );
}
