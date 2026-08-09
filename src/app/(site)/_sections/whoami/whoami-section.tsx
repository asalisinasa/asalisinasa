import styles from "./whoami-section.module.css";
import { TerminalSection } from "@/components/terminal-section";

export function WhoamiSection({ name, role }: { name: string; role: string }) {
    return (
        <TerminalSection title="whoami" ariaLabel="Whoami section">
            <p className={styles.line}>
                <span className={styles.strong}>{name}</span> — {role}
            </p>
        </TerminalSection>
    );
}
