import { defineQuery } from "next-sanity";

import type { Profile, SiteSettings } from "./types";

export const siteSettingsQuery = defineQuery(`
    *[_type == "siteSettings" && _id == "siteSettings"][0] {
        name,
        title,
        description
    }
`);

export const profileQuery = defineQuery(`
    *[_type == "profile" && _id == "profile"][0] {
        name,
        role,
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
        },
        skillGroups[] {
            title,
            tone,
            skills
        }
    }
`);

export type SiteSettingsResult = SiteSettings;
export type ProfileResult = Profile;
