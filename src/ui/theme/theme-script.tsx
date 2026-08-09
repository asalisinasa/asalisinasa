import {
    THEME_COLORS,
    THEME_MEDIA_QUERY,
    THEME_STORAGE_KEY,
    type ResolvedTheme,
    type ThemePreference,
} from "./theme";

function themeScript(
    storageKey: string,
    mediaQuery: string,
    themeColors: Record<ResolvedTheme, string>,
) {
    let preference: ThemePreference = "system";

    try {
        const storedPreference = window.localStorage.getItem(storageKey);
        if (storedPreference === "light" || storedPreference === "dark") {
            preference = storedPreference;
        }
    } catch {}

    const systemTheme: ResolvedTheme = window.matchMedia(mediaQuery).matches ? "dark" : "light";
    const resolvedTheme = preference === "system" ? systemTheme : preference;
    const root = document.documentElement;

    root.dataset.theme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;

    const themeColor = document.createElement("meta");

    themeColor.name = "theme-color";
    themeColor.content = themeColors[resolvedTheme];
    themeColor.dataset.themeManaged = "true";
    document.head.appendChild(themeColor);
}

const themeScriptArguments = JSON.stringify([
    THEME_STORAGE_KEY,
    THEME_MEDIA_QUERY,
    THEME_COLORS,
]).slice(1, -1);

export function ThemeScript() {
    return (
        <script
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
                __html: `(${themeScript.toString()})(${themeScriptArguments})`,
            }}
        />
    );
}
