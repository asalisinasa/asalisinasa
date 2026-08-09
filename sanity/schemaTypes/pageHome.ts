import { defineArrayMember, defineField, defineType } from "sanity";

export const pageHome = defineType({
    name: "pageHome",
    type: "document",
    title: "Home page",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            initialValue: "Home",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "sections",
            title: "Sections",
            type: "array",
            description:
                "Optional home sections. Add, remove, and reorder whoami / tag groups sections.",
            of: [
                defineArrayMember({
                    type: "reference",
                    name: "whoamiSection",
                    title: "Whoami section",
                    to: [{ type: "whoamiSection" }],
                }),
                defineArrayMember({
                    type: "reference",
                    name: "tagGroupsSection",
                    title: "Tag groups section",
                    to: [{ type: "tagGroupsSection" }],
                }),
            ],
            validation: (r) => r.unique(),
        }),
    ],
    preview: {
        select: { title: "title" },
        prepare({ title }) {
            return { title: title || "Home" };
        },
    },
});
