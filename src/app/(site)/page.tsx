import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery } from "@/sanity/queries";
import type { HomePage, HomePageSection } from "@/sanity/types";
import { Container } from "@/ui/container";
import { LayoutWindow } from "@/ui/layout-window";
import { ThemeToggle } from "@/ui/theme";

import { SectionConnect } from "./_sections/section-connect/section-connect";
import { SectionTagGroups } from "./_sections/section-tag-groups/section-tag-groups";
import { SectionTerminalHero } from "./_sections/section-terminal-hero/section-terminal-hero";
// import { FocusSection } from "./_sections/focus/focus-section";
// import { StatusSection } from "./_sections/status/status-section";
// import { UptimeSection } from "./_sections/uptime/uptime-section";
// import { WorkSection } from "./_sections/work/work-section";

function renderHomeSection(section: HomePageSection) {
  switch (section._type) {
    case "whoamiSection":
      return (
        <SectionTerminalHero
          key={section._id}
          title={section.title}
          ariaLabel={section.ariaLabel ?? ""}
          name={section.name}
          role={section.role}
        />
      );
    case "tagGroupsSection":
      return section.groups?.length ? (
        <SectionTagGroups
          key={section._id}
          title={section.title}
          ariaLabel={section.ariaLabel ?? ""}
          groups={section.groups}
        />
      ) : null;
    default: {
      const _exhaustive: never = section;
      return _exhaustive;
    }
  }
}

export default async function Home() {
  const { data } = await sanityFetch({
    query: homePageQuery,
    tags: ["pageHome", "profile", "whoamiSection", "tagGroupsSection"]
  });
  const page = data as HomePage | null;
  const profile = page?.profile ?? null;
  const sections = page?.sections ?? [];

  if (!page || (sections.length === 0 && !profile)) {
    return <Container aria-label="Profile content is not yet published" />;
  }

  return (
    <Container>
      <LayoutWindow>
        <LayoutWindow.Header>
          <ThemeToggle />
        </LayoutWindow.Header>
        <LayoutWindow.Main>
          {sections.map((section) => renderHomeSection(section))}

          {/* {profile?.uptime && <UptimeSection uptime={profile.uptime} />} */}
          {/* {profile?.featuredProjects?.length && (
                        <WorkSection title="ls ~/selected-work/" projects={profile.featuredProjects} />
                    )} */}
          {/* {profile?.currentFocus && <FocusSection currentFocus={profile.currentFocus} />} */}
          {/* {profile?.status && <StatusSection status={profile.status} />} */}
          {profile?.links?.length ? (
            <LayoutWindow.Footer>
              <SectionConnect links={profile.links} />
            </LayoutWindow.Footer>
          ) : null}
        </LayoutWindow.Main>
      </LayoutWindow>
    </Container>
  );
}
