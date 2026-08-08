import styles from "./whoami-section.module.css";

export function WhoamiSection({ name, role }: { name: string; role: string }) {
    return (
        <section className={styles.section} aria-labelledby="whoami">
            <h1 className={styles.command} id="whoami">
                ▸ whoami
            </h1>
            <p className={styles.line}>
                <span className={styles.strong}>{name}</span> — {role}
            </p>
        </section>
    );
}
