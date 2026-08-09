import { defineField } from "sanity";

export const terminalSectionFields = [
    defineField({
        name: "slug",
        title: "Slug",
        type: "slug",
        options: { source: "title" },
        description: "Used as the in-page anchor href, e.g. terminal-section-1",
        validation: (r) => r.required(),
    }),
    defineField({
        name: "title",
        title: "Title",
        type: "string",
        description: "Shown as the section heading",
        validation: (r) => r.required(),
    }),
    defineField({
        name: "ariaLabel",
        title: "Aria label",
        type: "string",
        description: "Used as the section aria-label",
    }),
    defineField({
        name: "description",
        title: "Description",
        type: "string",
        description: "One-line summary shown under the heading",
    }),
    defineField({
        name: "richtext",
        title: "Rich text",
        type: "array",
        of: [{ type: "block" }],
        description: "Main body content of the section",
    }),
];