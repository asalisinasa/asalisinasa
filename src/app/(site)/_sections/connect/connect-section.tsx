import type { CSSProperties } from "react";

import type { ProfileLink } from "@/sanity/types";
import { TerminalSection } from "@/components/terminal-section";

import styles from "./connect-section.module.css";

function formatLinkDisplay(href: string): string {
    if (href.startsWith("mailto:")) {
        return href.slice("mailto:".length);
    }

    if (href.startsWith("tel:")) {
        return href.slice("tel:".length);
    }

    if (href.startsWith("#")) {
        return href.slice(1) || href;
    }

    try {
        const url = new URL(href);
        const path = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "");
        return `${url.host}${path}`;
    } catch {
        return href;
    }
}

function isExternalHref(href: string): boolean {
    return href.startsWith("http://") || href.startsWith("https://");
}

export function ConnectSection({ links }: { links: ProfileLink[] }) {
    return (
        <TerminalSection title="connect --list" ariaLabel="Connect section">
            <ol className={styles.list} aria-label="Contact links">
                {links.map((link, index) => (
                    <li
                        key={link.href}
                        className={styles.entry}
                        style={{ "--i": index } as CSSProperties}
                    >
                        <a
                            href={link.href}
                            className={styles.link}
                            {...(isExternalHref(link.href)
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                        >
                            <span className={styles.idx} aria-hidden="true">
                                {index + 1}
                            </span>
                            <span className={styles.name}>{link.label}</span>
                            <span></span>
                            <div className={styles.linkLabel}>
                                <span>{formatLinkDisplay(link.href)}</span>
                                <svg
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    className="icon-module__kgS5bW__icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.04068 6.70711L16.0018 6.70712V17.6832H14.4018L14.5861 9.25512L4.8384 19.0028L3.70703 17.8714L13.4557 8.12278L5.04068 8.30711L5.04068 6.70711Z"
                                        clipRule="evenodd"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                        </a>
                    </li>
                ))}
            </ol>
        </TerminalSection>
    );
}
