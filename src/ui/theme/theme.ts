export const THEME_STORAGE_KEY = "theme-preference:v1";
export const THEME_MEDIA_QUERY = "(prefers-color-scheme: dark)";
export const THEME_PREFERENCES = ["system", "light", "dark"] as const;

export type ThemePreference = (typeof THEME_PREFERENCES)[number];
export type ResolvedTheme = Exclude<ThemePreference, "system">;

export const THEME_COLORS: Record<ResolvedTheme, string> = {
    light: "#fdfbff",
    dark: "#151827",
};

export interface ThemeContextValue {
    state: {
        preference: ThemePreference;
        resolvedTheme: ResolvedTheme;
    };
    actions: {
        setPreference: (preference: ThemePreference) => void;
    };
    meta: {
        mounted: boolean;
        systemTheme: ResolvedTheme;
    };
}

export function isThemePreference(value: unknown): value is ThemePreference {
    return typeof value === "string" && THEME_PREFERENCES.some((theme) => theme === value);
}

export function resolveTheme(
    preference: ThemePreference,
    systemTheme: ResolvedTheme,
): ResolvedTheme {
    return preference === "system" ? systemTheme : preference;
}
