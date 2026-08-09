import { sanityFetch } from "@/sanity/lib/live";
import { profileQuery } from "@/sanity/queries";
import type { Profile } from "@/sanity/types";

import { ConnectSection } from "./_sections/connect/connect-section";
import { FocusSection } from "./_sections/focus/focus-section";
import { SkillsSection } from "./_sections/skills/skills-section";
import { StatusSection } from "./_sections/status/status-section";
import { UptimeSection } from "./_sections/uptime/uptime-section";
import { WhoamiSection } from "./_sections/whoami/whoami-section";
import { WorkSection } from "./_sections/work/work-section";
import { Terminal } from "./_components/terminal/terminal";

import styles from "./page.module.css";

export default async function Home() {
    const { data } = await sanityFetch({
        query: profileQuery,
        tags: ["profile"],
    });
    const profile = data as Profile | null;

    if (!profile) {
        return <main className={styles.page} aria-label="Profile content is not yet published" />;
    }

    return (
        <main className={styles.page}>
            <Terminal>
                <WhoamiSection name={profile.name} role={profile.role} />
                {profile.uptime && <UptimeSection uptime={profile.uptime} />}
                {profile.skillGroups?.length && <SkillsSection groups={profile.skillGroups} />}

                {/* {profile.featuredProjects?.length && (
                    <WorkSection title="ls ~/selected-work/" projects={profile.featuredProjects} />
                )} */}
                {/* {profile.currentFocus && <FocusSection currentFocus={profile.currentFocus} />} */}
                {/* {profile.status && <StatusSection status={profile.status} />} */}

                {profile.links?.length && <ConnectSection links={profile.links} />}
            </Terminal>
        </main>
    );
}
