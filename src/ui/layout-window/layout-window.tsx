import type { ReactNode } from "react";

import { FooterWindow } from "./footer-window";
import { HeaderWindow } from "./header-window";
import { MainWindow } from "./main-window";
import styles from "./layout-window.module.css";

function LayoutWindowRoot({ children }: { children: ReactNode }) {
    return (
        <div className={styles.layoutWindow} aria-label="Layout window resume card">
            {children}
        </div>
    );
}

export const LayoutWindow = Object.assign(LayoutWindowRoot, {
    Header: HeaderWindow,
    Main: MainWindow,
    Footer: FooterWindow,
});
