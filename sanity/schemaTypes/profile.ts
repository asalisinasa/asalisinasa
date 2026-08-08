import { defineField, defineType } from "sanity";

const linkKindOptions = [
    { title: "Primary", value: "primary" },
    { title: "Social", value: "social" },
    { title: "Archive", value: "archive" },
];

const toneOptions = [
    { title: "Green", value: "green" },
    { title: "Pink", value: "pink" },
];

export const profile = defineType({
    name: "profile",
    type: "document",
    title: "Profile",
    fields: [
        defineField({
            name: "name",
            title: "Name (handle)",
            type: "string",
            description: "Shown as the whoami handle, e.g. alina.stepanova",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "role",
            title: "Role",
            type: "string",
            validation: (r) => r.required(),
        }),
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
                {
                    type: "object",
                    title: "Link",
                    fields: [
                        defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
                        defineField({ name: "href", title: "Href", type: "string", validation: (r) => r.required() }),
                        defineField({
                            name: "kind",
                            title: "Kind",
                            type: "string",
                            options: { list: linkKindOptions },
                        }),
                    ],
                    preview: { select: { title: "label", subtitle: "href" } },
                },
            ],
            validation: (r) => r.unique(),
        }),
        defineField({
            name: "skillGroups",
            title: "Skill groups",
            type: "array",
            of: [
                {
                    type: "object",
                    title: "Skill group",
                    fields: [
                        defineField({ name: "title", title: "Label", type: "string", description: "Bracket label, e.g. [frontend]", validation: (r) => r.required() }),
                        defineField({
                            name: "tone",
                            title: "Tone",
                            type: "string",
                            options: { list: toneOptions },
                            initialValue: "green",
                        }),
                        defineField({
                            name: "skills",
                            title: "Skills",
                            type: "array",
                            of: [{ type: "string" }],
                            options: { layout: "tags" },
                        }),
                    ],
                    preview: { select: { title: "title" } },
                },
            ],
        }),
        defineField({
            name: "featuredProjects",
            title: "Featured projects",
            type: "array",
            of: [{ type: "reference", to: [{ type: "project" }] }],
        }),
    ],
    preview: { select: { title: "name" } },
});