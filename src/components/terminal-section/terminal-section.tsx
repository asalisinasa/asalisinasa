import type { ReactNode } from "react";

import styles from "./terminal-section.module.css";

export function TerminalSection({
    title,
    ariaLabel,
    children,
}: {
    title: string;
    ariaLabel: string;
    children: ReactNode;
}) {
    return (
        <section className={styles.section} aria-label={ariaLabel}>
            <h2 className={styles.command} id={title}>
                <span className={styles.icon} aria-hidden="true">
                    ▸
                </span>
                <span className={styles.title}>{title}</span>
            </h2>
            <div className={styles.body}>{children}</div>
        </section>
    );
}
