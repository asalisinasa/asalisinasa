import type { SchemaTypeDefinition } from "sanity";

import { pageHome } from "./pageHome";
import { profile } from "./profile";
import { project } from "./project";
import { siteSettings } from "./siteSettings";
import { skillGroup } from "./skillGroup";
import { sectionTagGroups } from "./section-tag-groups";
import { sectionWhoami } from "./section-whoami";

export const schemaTypes: SchemaTypeDefinition[] = [
    siteSettings,
    pageHome,
    profile,
    project,
    skillGroup,
    sectionWhoami,
    sectionTagGroups,
];
