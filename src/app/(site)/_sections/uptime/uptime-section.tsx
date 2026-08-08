import styles from "./uptime-section.module.css";

export function UptimeSection({ uptime }: { uptime: string }) {
    return (
        <section className={styles.section} aria-labelledby="uptime">
            <h2 className={styles.command} id="uptime">
                ▸ uptime
            </h2>
            <p className={styles.line}>
                <span className={styles.strong}>{uptime}</span>
            </p>
        </section>
    );
}
