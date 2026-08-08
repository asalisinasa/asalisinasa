import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { DisableDraftMode } from "@/components/disable-draft-mode";
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
        <html lang="en">
            <body>
                {children}
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
