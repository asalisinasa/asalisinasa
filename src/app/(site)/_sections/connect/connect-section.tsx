import type { CSSProperties } from "react";

import type { ProfileLink } from "@/sanity/types";

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
        <section className={styles.section} aria-labelledby="connect">
            <h2 className={styles.command} id="connect">
                ▸ connect --list
            </h2>
            <ol className={styles.list} aria-label="Contact links">
                {links.map((link, index) => (
                    <li
                        key={link.href}
                        className={styles.entry}
                        style={{ "--i": index } as CSSProperties}
                    >
                        <a
                            href={link.href}
                            {...(isExternalHref(link.href)
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                            className={styles.link}
                        >
                            <span className={styles.idx} aria-hidden="true">
                                {index + 1}
                            </span>
                            <span className={styles.name}>{link.label}</span>
                            <span></span>
                            <span className={styles.linkLabel}>{formatLinkDisplay(link.href)}</span>
                        </a>
                    </li>
                ))}
            </ol>
        </section>
    );
}
