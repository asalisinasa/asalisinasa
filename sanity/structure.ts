import type { StructureResolver } from "sanity/structure";

const SINGLETON_TYPES = new Set([
    "pageHome",
    "profile",
    "siteSettings",
    "whoamiSection",
    "tagGroupsSection",
]);

export const structure: StructureResolver = (S) =>
    S.list()
        .title("Content")
        .items([
            S.listItem()
                .title("Pages")
                .id("pages")
                .child(
                    S.list()
                        .title("Pages")
                        .id("pages")
                        .items([
                            S.listItem()
                                .title("Home")
                                .id("pageHome")
                                .child(
                                    S.document()
                                        .schemaType("pageHome")
                                        .documentId("pageHome")
                                        .title("Home"),
                                ),
                        ]),
                ),
            S.divider(),
            S.listItem()
                .title("Sections")
                .id("sections")
                .child(
                    S.list()
                        .title("Sections")
                        .items([
                            S.listItem()
                                .title("Whoami section")
                                .id("whoamiSection")
                                .child(
                                    S.document()
                                        .schemaType("whoamiSection")
                                        .documentId("whoamiSection")
                                        .title("Whoami section"),
                                ),
                            S.listItem()
                                .title("Tag groups section")
                                .id("tagGroupsSection")
                                .child(
                                    S.document()
                                        .schemaType("tagGroupsSection")
                                        .documentId("tagGroupsSection")
                                        .title("Tag groups section"),
                                ),
                        ]),
                ),
            S.divider(),
            S.listItem()
                .title("Profile")
                .id("profile")
                .child(
                    S.document()
                        .schemaType("profile")
                        .documentId("profile")
                        .title("Profile"),
                ),
            S.listItem()
                .title("Site settings")
                .id("siteSettings")
                .child(
                    S.document()
                        .schemaType("siteSettings")
                        .documentId("siteSettings")
                        .title("Site settings"),
                ),
            S.divider(),
            ...S.documentTypeListItems().filter((listItem) => {
                const id = listItem.getId();
                return id !== undefined && !SINGLETON_TYPES.has(id);
            }),
        ]);
