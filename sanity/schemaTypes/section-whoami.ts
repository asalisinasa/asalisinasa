import { defineField, defineType } from "sanity";

import { sectionTerminalFields } from "./section-terminal";

export const sectionWhoami = defineType({
    name: "whoamiSection",
    type: "document",
    title: "Whoami section",
    fields: [
        ...sectionTerminalFields,
        defineField({
            name: "name",
            title: "Name (handle)",
            type: "string",
            description: "Shown as the whoami handle, e.g. asalisinasa",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "role",
            title: "Role",
            type: "string",
            validation: (r) => r.required(),
        }),
    ],
    preview: { select: { title: "title", subtitle: "name" } },
});
