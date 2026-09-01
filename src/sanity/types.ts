export type ProfileLink = {
  label: string;
  href: string;
  kind: "primary" | "social" | "archive" | null;
};

export type SkillGroup = {
  _key?: string;
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
  uptime: string | null;
  currentFocus: string | null;
  status: string | null;
  links: ProfileLink[] | null;
  featuredProjects: Project[] | null;
};

export type WhoamiSection = {
  _type: "whoamiSection";
  _id: string;
  slug: string | null;
  title: string;
  ariaLabel: string | null;
  name: string;
  role: string;
};

export type TagGroupsSection = {
  _type: "tagGroupsSection";
  _id: string;
  slug: string | null;
  title: string;
  ariaLabel: string | null;
  groups: SkillGroup[] | null;
};

export type HomePageSection = WhoamiSection | TagGroupsSection;

export type HomePage = {
  title: string;
  sections: HomePageSection[] | null;
  profile: Profile | null;
};

export type SiteSettings = {
  name: string;
  title: string;
  description: string;
};

type UpdatedAtDocument = {
  _updatedAt: string;
};

export type HomePageUpdatedAt = {
  documents: UpdatedAtDocument[] | null;
  sections: UpdatedAtDocument[] | null;
};
