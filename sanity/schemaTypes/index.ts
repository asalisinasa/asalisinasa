import type { SchemaTypeDefinition } from "sanity";

import { profile } from "./profile";
import { project } from "./project";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [siteSettings, profile, project];