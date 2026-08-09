import { defineField } from "sanity";

export const sectionTerminalFields = [
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
];
