import type { MetadataRoute } from "next";

import { sanityFetch } from "@/sanity/lib/live";
import { homePageUpdatedAtQuery } from "@/sanity/queries";
import type { HomePageUpdatedAt } from "@/sanity/types";

import { siteUrl } from "./_lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await sanityFetch({
    query: homePageUpdatedAtQuery,
    tags: [
      "siteSettings",
      "pageHome",
      "profile",
      "whoamiSection",
      "tagGroupsSection"
    ],
    stega: false
  });
  const updatedAt = data as HomePageUpdatedAt | null;
  const timestamps = [
    ...(updatedAt?.documents ?? []),
    ...(updatedAt?.sections ?? [])
  ]
    .map((document) => Date.parse(document._updatedAt))
    .filter(Number.isFinite);
  const lastModified = timestamps.length
    ? new Date(Math.max(...timestamps))
    : undefined;

  return [
    {
      url: `${siteUrl}/`,
      lastModified
    }
  ];
}
