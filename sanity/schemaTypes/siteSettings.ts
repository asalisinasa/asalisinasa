import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
    name: "siteSettings",
    type: "document",
    title: "Site settings",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "title",
            title: "Browser title",
            type: "string",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "description",
            title: "Meta description",
            type: "text",
            rows: 3,
            validation: (r) => r.required(),
        }),
    ],
    preview: { select: { title: "name" } },
});