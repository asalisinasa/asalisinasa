import { defineArrayMember, defineField, defineType } from "sanity";

const linkKindOptions = [
    { title: "Primary", value: "primary" },
    { title: "Social", value: "social" },
    { title: "Archive", value: "archive" },
];

export const profile = defineType({
    name: "profile",
    type: "document",
    title: "Profile",
    fields: [
        defineField({
            name: "uptime",
            title: "Uptime line",
            type: "string",
            description: "Text after ▸ uptime, e.g. '8 years building product-focused frontend systems'",
        }),
        defineField({
            name: "currentFocus",
            title: "Current focus line",
            type: "string",
            description: "Text after ▸ echo $CURRENT_FOCUS",
        }),
        defineField({
            name: "status",
            title: "Status line",
            type: "string",
            description: "Text after ▸ status",
        }),
        defineField({
            name: "links",
            title: "Connect links",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    title: "Link",
                    fields: [
                        defineField({
                            name: "label",
                            title: "Label",
                            type: "string",
                            validation: (r) => r.required(),
                        }),
                        defineField({
                            name: "href",
                            title: "Href",
                            type: "string",
                            validation: (r) => r.required(),
                        }),
                        defineField({
                            name: "kind",
                            title: "Kind",
                            type: "string",
                            options: { list: linkKindOptions },
                        }),
                    ],
                    preview: { select: { title: "label", subtitle: "href" } },
                }),
            ],
            validation: (r) => r.unique(),
        }),
        defineField({
            name: "featuredProjects",
            title: "Featured projects",
            type: "array",
            of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
        }),
    ],
    preview: { select: { title: "status" } },
});
