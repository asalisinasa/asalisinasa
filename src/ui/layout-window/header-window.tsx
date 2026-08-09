import type { ReactNode } from "react";

import styles from "./layout-window.module.css";

export function HeaderWindow({ children }: { children?: ReactNode }) {
    return (
        <header className={styles.bar}>
            <div className={styles.dots} aria-hidden="true">
                <span className={`${styles.dot} ${styles.dotPink}`} />
                <span className={`${styles.dot} ${styles.dotSand}`} />
                <span className={`${styles.dot} ${styles.dotGreen}`} />
            </div>
            {children}
        </header>
    );
}
