import type { ReactNode } from "react";

import styles from "./terminal.module.css";

export function Terminal({ children }: { children: ReactNode }) {
    return (
        <article className={styles.terminal} aria-label="Terminal style resume card">
            <header className={styles.bar} aria-hidden="true">
                <span className={`${styles.dot} ${styles.dotPink}`} />
                <span className={`${styles.dot} ${styles.dotSand}`} />
                <span className={`${styles.dot} ${styles.dotGreen}`} />
            </header>
            <div className={styles.body}>{children}</div>
        </article>
    );
}
