import { defineArrayMember, defineField, defineType } from "sanity";

import { sectionTerminalFields } from "./section-terminal";

export const sectionTagGroups = defineType({
    name: "tagGroupsSection",
    type: "document",
    title: "Tag groups section",
    fields: [
        ...sectionTerminalFields,
        defineField({
            name: "groups",
            title: "Tag groups",
            type: "array",
            of: [defineArrayMember({ type: "skillGroup" })],
            validation: (r) => r.required().min(1),
        }),
    ],
    preview: { select: { title: "title", subtitle: "slug.current" } },
});
