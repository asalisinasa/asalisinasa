import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { siteSettingsQuery } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { ThemeProvider } from "@/ui/theme";
import { DisableDraftMode } from "@/widgets-ui/disable-draft-mode";

import "./globals.css";

async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data } = await sanityFetch({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
    stega: false
  });
  return data as SiteSettings | null;
}

const faviconIcons: NonNullable<Metadata["icons"]> = {
  icon: [
    {
      url: "/favicon-light-32x32.png",
      sizes: "32x32",
      type: "image/png",
      media: "(prefers-color-scheme: light)"
    },
    {
      url: "/favicon-dark-32x32.png",
      sizes: "32x32",
      type: "image/png",
      media: "(prefers-color-scheme: dark)"
    },
    {
      url: "/favicon-light.svg",
      sizes: "any",
      type: "image/svg+xml",
      media: "(prefers-color-scheme: light)"
    },
    {
      url: "/favicon-dark.svg",
      sizes: "any",
      type: "image/svg+xml",
      media: "(prefers-color-scheme: dark)"
    }
  ],
  apple: [
    { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
  ],
  other: [
    {
      rel: "mask-icon",
      url: "/safari-pinned-tab.svg",
      color: "#3f5a48"
    }
  ]
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfbff" },
    { media: "(prefers-color-scheme: dark)", color: "#151827" }
  ]
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  if (!settings) {
    return { icons: faviconIcons };
  }

  return {
    title: settings.title,
    description: settings.description,
    icons: faviconIcons
  };
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <SanityLive />
        <Analytics />
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
