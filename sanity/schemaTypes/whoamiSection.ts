import { defineType } from "sanity";

import { terminalSectionFields } from "./terminalSection";

export const whoamiSection = defineType({
    name: "whoamiSection",
    type: "document",
    title: "Whoami section",
    fields: [...terminalSectionFields],
    preview: { select: { title: "title", subtitle: "slug" } },
});