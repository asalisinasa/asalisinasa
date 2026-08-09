import { defineField, defineType } from "sanity";

export const project = defineType({
    name: "project",
    type: "document",
    title: "Project",
    fields: [
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title" },
            description: "Used as the in-page anchor href, e.g. project-name",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            description: "Shown inside brackets in the card, e.g. project-name",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "string",
            description: "One-line summary shown under the heading",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "tags",
            title: "Tags (green)",
            type: "array",
            of: [{ type: "string" }],
            options: { layout: "tags" },
        }),
        defineField({
            name: "accentTags",
            title: "Accent tags (pink)",
            type: "array",
            of: [{ type: "string" }],
            options: { layout: "tags" },
        }),
        defineField({
            name: "richtext",
            title: "Rich text",
            type: "array",
            of: [{ type: "block" }],
            description: "Main body content of the section",
        }),
    ],
    preview: { select: { title: "title", subtitle: "slug.current" } },
});