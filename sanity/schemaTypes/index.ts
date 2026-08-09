import type { SchemaTypeDefinition } from "sanity";

import { profile } from "./profile";
import { project } from "./project";
import { siteSettings } from "./siteSettings";
import { whoamiSection } from "./whoamiSection";

export const schemaTypes: SchemaTypeDefinition[] = [siteSettings, profile, project, whoamiSection];