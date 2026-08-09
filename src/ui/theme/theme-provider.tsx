"use client";

import type { ReactNode } from "react";
import { createContext, use, useCallback, useEffect, useMemo, useState } from "react";

import {
  isThemePreference,
  resolveTheme,
  THEME_COLORS,
  THEME_MEDIA_QUERY,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemeContextValue,
  type ThemePreference,
} from "./theme";
import { ThemeScript } from "./theme-script";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(THEME_MEDIA_QUERY).matches ? "dark" : "light";
}

function loadPreference(): ThemePreference {
  try {
    const preference = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(preference) ? preference : "system";
  } catch {
    return "system";
  }
}

function savePreference(preference: ThemePreference): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // The active theme still applies when storage is unavailable.
  }
}

function applyTheme(theme: ResolvedTheme): void {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  let themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"][data-theme-managed="true"]',
  );

  if (!themeColor) {
    themeColor = document.createElement("meta");
    themeColor.name = "theme-color";
    themeColor.dataset.themeManaged = "true";
  }

  themeColor.content = THEME_COLORS[theme];
  document.head.appendChild(themeColor);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>("light");
  const [mounted, setMounted] = useState(false);
  const resolvedTheme = resolveTheme(preference, systemTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia(THEME_MEDIA_QUERY);
    const initialPreference = loadPreference();
    const initialSystemTheme = mediaQuery.matches ? "dark" : "light";

    setPreferenceState(initialPreference);
    setSystemTheme(initialSystemTheme);
    applyTheme(resolveTheme(initialPreference, initialSystemTheme));
    setMounted(true);

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) {
        return;
      }

      setPreferenceState(isThemePreference(event.newValue) ? event.newValue : "system");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (mounted) {
      applyTheme(resolvedTheme);
    }
  }, [mounted, resolvedTheme]);

  const setPreference = useCallback((nextPreference: ThemePreference) => {
    savePreference(nextPreference);
    setPreferenceState(nextPreference);
    applyTheme(resolveTheme(nextPreference, getSystemTheme()));
  }, []);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      state: { preference, resolvedTheme },
      actions: { setPreference },
      meta: { mounted, systemTheme },
    }),
    [mounted, preference, resolvedTheme, setPreference, systemTheme],
  );

  return (
    <ThemeContext value={contextValue}>
      <ThemeScript />
      {children}
    </ThemeContext>
  );
}

export function useTheme(): ThemeContextValue {
  const context = use(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
