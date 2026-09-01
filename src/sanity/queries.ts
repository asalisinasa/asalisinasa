import { defineQuery } from "next-sanity";

import type { HomePage, SiteSettings } from "./types";

export const siteSettingsQuery = defineQuery(`
    *[_type == "siteSettings" && _id == "siteSettings"][0] {
        name,
        title,
        description
    }
`);

export const homePageQuery = defineQuery(`
    *[_type == "pageHome" && _id == "pageHome"][0] {
        title,
        sections[]->{
            _type,
            _id,
            "slug": slug.current,
            title,
            ariaLabel,
            _type == "whoamiSection" => {
                name,
                role
            },
            _type == "tagGroupsSection" => {
                groups[] {
                    _key,
                    title,
                    tone,
                    skills
                }
            }
        },
        "profile": *[_type == "profile" && _id == "profile"][0] {
            uptime,
            currentFocus,
            status,
            links[] {
                label,
                href,
                kind
            },
            "featuredProjects": featuredProjects[]-> {
                "slug": slug.current,
                title,
                description,
                tags,
                accentTags
            }
        }
    }
`);

export const homePageUpdatedAtQuery = defineQuery(`
    {
        "documents": *[_id in ["siteSettings", "pageHome", "profile"]] {
            _updatedAt
        },
        "sections": *[_id == "pageHome"][0].sections[]-> {
            _updatedAt
        }
    }
`);

export type SiteSettingsResult = SiteSettings;
export type HomePageResult = HomePage;
