import type { CSSProperties } from "react";

import type { ProfileLink } from "@/sanity/types";
import { IconLink } from "@/ui/icons";
import { TerminalSection } from "@/ui/terminal-section";

import styles from "./section-connect.module.css";

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

export function SectionConnect({ links }: { links: ProfileLink[] }) {
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
                                <IconLink />
                            </div>
                        </a>
                    </li>
                ))}
            </ol>
        </TerminalSection>
    );
}
