import styles from "./focus-section.module.css";

export function FocusSection({ currentFocus }: { currentFocus: string }) {
  return (
    <section className={styles.section} aria-labelledby="focus">
      <h2 className={styles.command} id="focus">
        ▸ echo $CURRENT_FOCUS
      </h2>
      <p className={styles.line}>{currentFocus}</p>
    </section>
  );
}
