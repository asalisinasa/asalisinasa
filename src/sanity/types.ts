export type ProfileLink = {
    label: string;
    href: string;
    kind: "primary" | "social" | "archive" | null;
};

export type SkillGroup = {
    title: string;
    tone: "green" | "pink" | null;
    skills: string[] | null;
};

export type Project = {
    slug: { current: string; _type: "slug" } | string | null;
    title: string;
    description: string;
    tags: string[] | null;
    accentTags: string[] | null;
};

export type Profile = {
    name: string;
    role: string;
    uptime: string | null;
    currentFocus: string | null;
    status: string | null;
    links: ProfileLink[] | null;
    skillGroups: SkillGroup[] | null;
    featuredProjects: Project[] | null;
};

export type SiteSettings = {
    name: string;
    title: string;
    description: string;
};
