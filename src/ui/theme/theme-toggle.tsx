"use client";

import type { KeyboardEvent, ReactNode } from "react";

import { IconDark, IconLight, IconSystem } from "@/ui/icons";

import { THEME_PREFERENCES, type ThemePreference } from "./theme";
import { useTheme } from "./theme-provider";
import styles from "./theme-toggle.module.css";

const THEME_LABELS: Record<ThemePreference, string> = {
  system: "Use system theme",
  light: "Use light theme",
  dark: "Use dark theme",
};

const THEME_ICONS: Record<ThemePreference, ReactNode> = {
  system: <IconSystem />,
  light: <IconLight />,
  dark: <IconDark />,
};

export function ThemeToggle() {
  const {
    state: { preference },
    actions: { setPreference },
    meta: { mounted },
  } = useTheme();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, currentTheme: ThemePreference) => {
    let nextTheme: ThemePreference | undefined;
    const currentIndex = THEME_PREFERENCES.indexOf(currentTheme);

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextTheme = THEME_PREFERENCES[(currentIndex + 1) % THEME_PREFERENCES.length];
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextTheme =
        THEME_PREFERENCES[(currentIndex - 1 + THEME_PREFERENCES.length) % THEME_PREFERENCES.length];
    } else if (event.key === "Home") {
      nextTheme = THEME_PREFERENCES[0];
    } else if (event.key === "End") {
      nextTheme = THEME_PREFERENCES[THEME_PREFERENCES.length - 1];
    }

    if (!nextTheme) {
      return;
    }

    event.preventDefault();
    setPreference(nextTheme);
    event.currentTarget
      .closest("fieldset")
      ?.querySelector<HTMLInputElement>(`input[value="${nextTheme}"]`)
      ?.focus();
  };

  return (
    <fieldset className={styles.toggle}>
      <legend className={styles.legend}>Color theme</legend>
      {THEME_PREFERENCES.map((theme) => (
        <label className={styles.option} key={theme} title={THEME_LABELS[theme]}>
          <input
            className={styles.input}
            type="radio"
            name="theme"
            value={theme}
            aria-label={THEME_LABELS[theme]}
            checked={mounted && preference === theme}
            disabled={!mounted}
            onChange={() => setPreference(theme)}
            onKeyDown={(event) => handleKeyDown(event, theme)}
          />
          <span className={styles.icon}>{THEME_ICONS[theme]}</span>
        </label>
      ))}
    </fieldset>
  );
}
