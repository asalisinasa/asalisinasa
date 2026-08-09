import styles from "./layout-window.module.css";

export function HeaderWindow() {
    return (
        <header className={styles.bar} aria-hidden="true">
            <span className={`${styles.dot} ${styles.dotPink}`} />
            <span className={`${styles.dot} ${styles.dotSand}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
        </header>
    );
}
