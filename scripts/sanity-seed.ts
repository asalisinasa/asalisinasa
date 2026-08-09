import { createClient, type SanityClient } from "@sanity/client";

import { apiVersion, dataset, projectId } from "../sanity/env";

let keyCounter = 0;
const key = (prefix: string) => `${prefix}-${(keyCounter += 1).toString(36)}`;

const projects = [
  {
    id: "project-component-library",
    slug: "component-library",
    title: "component-library",
    description: "Reusable UI components and APIs",
    tags: ["React"],
    accentTags: ["DS"]
  },
  {
    id: "project-agentic-dev-harness",
    slug: "agentic-dev-harness",
    title: "agentic-dev-harness",
    description: "AI-ready docs, skills and workflows",
    tags: ["DX"],
    accentTags: ["AI"]
  },
  {
    id: "project-classifieds-redesign",
    slug: "classifieds-redesign",
    title: "classifieds-redesign",
    description: "UI layer for high-traffic marketplace",
    tags: ["TS"],
    accentTags: ["SPA"]
  },
  {
    id: "project-a11y-performance",
    slug: "a11y-performance",
    title: "a11y-performance",
    description: "WCAG patterns and rendering optimization",
    tags: ["A11y"],
    accentTags: ["Perf"]
  }
] as const;

const skillGroups = [
  {
    title: "[frontend]",
    tone: "green",
    skills: ["React", "TypeScript", "Next.js", "SPA"]
  },
  {
    title: "[product craft]",
    tone: "green",
    skills: ["Ownership", "Prototyping", "UX intuition", "Edge cases"]
  },
  {
    title: "[systems]",
    tone: "green",
    skills: ["Design Systems", "A11y", "Performance"]
  },
  {
    title: "[ai / dx]",
    tone: "pink",
    skills: ["Cursor", "Agent docs", "Workflows", "Quality gates"]
  }
] as const;

const links = [
  { label: "Email", href: "mailto:asalisinasa@gmail.com", kind: "primary" },
  { label: "LinkedIn", href: "#linkedin", kind: "social" },
  { label: "GitHub", href: "https://github.com/asalisinasa", kind: "social" }
] as const;

async function seed() {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    throw new Error(
      "SANITY_API_WRITE_TOKEN is missing. Create a token with Editor access at\n" +
        `https://sanity.io/manage/project/${projectId}/api#tokens and export it in your shell.`
    );
  }

  const client: SanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false
  });

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    name: "asalisinasa",
    title: "asalisinasa — Frontend Engineer",
    description: ""
  });

  const projectRefs = await Promise.all(
    projects.map(async (p) => {
      const created = await client.createOrReplace({
        _id: p.id,
        _type: "project",
        slug: { _type: "slug", current: p.slug },
        title: p.title,
        description: p.description,
        tags: [...p.tags],
        accentTags: [...p.accentTags]
      });
      return { _type: "reference" as const, _ref: created._id, _key: p.slug };
    })
  );

  await client.createOrReplace({
    _id: "profile",
    _type: "profile",
    uptime: "",
    currentFocus: "Product-minded frontend roles with AI-assisted workflows",
    status: "open to remote product / startup opportunities",
    links: links.map((l) => ({ ...l, _key: key("link") })),
    featuredProjects: projectRefs
  });

  await client.createOrReplace({
    _id: "whoamiSection",
    _type: "whoamiSection",
    slug: { _type: "slug", current: "whoami" },
    title: "whoami",
    ariaLabel: "About me",
    name: "I'm asalisinasa",
    role: "Frontend Engineer"
  });

  await client.createOrReplace({
    _id: "tagGroupsSection",
    _type: "tagGroupsSection",
    slug: { _type: "slug", current: "skills" },
    title: "ls ~/skills/",
    ariaLabel: "My skills",
    groups: skillGroups.map((g) => ({
      ...g,
      skills: [...g.skills],
      _key: key("group")
    }))
  });

  await client.createOrReplace({
    _id: "pageHome",
    _type: "pageHome",
    title: "Home",
    sections: [
      {
        _type: "whoamiSection",
        _ref: "whoamiSection",
        _key: key("section")
      },
      {
        _type: "tagGroupsSection",
        _ref: "tagGroupsSection",
        _key: key("section")
      }
    ]
  });

  console.log(
    "Seeded siteSettings, pageHome, profile, whoamiSection, tagGroupsSection, and",
    projects.length,
    "projects"
  );
}

seed().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
