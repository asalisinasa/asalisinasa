import styles from "./status-section.module.css";

export function StatusSection({ status }: { status: string }) {
    return (
        <section className={styles.statusLine} aria-labelledby="status">
            <h2 className={styles.command} id="status">
                ▸ status
            </h2>
            <p className={styles.line}>{status}</p>
        </section>
    );
}
