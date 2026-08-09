import { defineArrayMember, defineField, defineType } from "sanity";

const toneOptions = [
    { title: "Green", value: "green" },
    { title: "Pink", value: "pink" },
];

export const skillGroup = defineType({
    name: "skillGroup",
    type: "object",
    title: "Skill group",
    fields: [
        defineField({
            name: "title",
            title: "Label",
            type: "string",
            description: "Bracket label, e.g. [frontend]",
            validation: (r) => r.required(),
        }),
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
            of: [defineArrayMember({ type: "string" })],
            options: { layout: "tags" },
        }),
    ],
    preview: { select: { title: "title" } },
});
