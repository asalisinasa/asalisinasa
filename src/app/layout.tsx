import type { Metadata, Viewport } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { DisableDraftMode } from "@/ui/disable-draft-mode";
import { ThemeProvider } from "@/ui/theme";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { siteSettingsQuery } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";

import "./globals.css";

async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data } = await sanityFetch({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
    stega: false,
  });
  return data as SiteSettings | null;
}

const faviconIcons: NonNullable<Metadata["icons"]> = {
  icon: [
    { url: "/favicon.ico", sizes: "any" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  ],
  apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  shortcut: "/favicon.ico",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfbff" },
    { media: "(prefers-color-scheme: dark)", color: "#151827" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  if (!settings) {
    return { icons: faviconIcons };
  }

  return {
    title: settings.title,
    description: settings.description,
    icons: faviconIcons,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  );
}
