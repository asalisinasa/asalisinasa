"use client";

import { type ReactNode, useRef } from "react";

import { useForwardDocumentScroll } from "./use-forward-document-scroll";
import styles from "./layout-window.module.css";

export function MainWindow({ children }: { children: ReactNode }) {
    const scrollerRef = useRef<HTMLElement>(null);
    useForwardDocumentScroll(scrollerRef);

    return (
        <main ref={scrollerRef} className={styles.body}>
            {children}
        </main>
    );
}
