import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
    S.list()
        .title("Content")
        .items([
            S.listItem()
                .title("Profile")
                .child(S.document().schemaType("profile").documentId("profile")),
            S.listItem()
                .title("Site settings")
                .child(
                    S.document()
                        .schemaType("siteSettings")
                        .documentId("siteSettings"),
                ),
            S.divider(),
            S.documentTypeListItem("project").title("Projects"),
        ]);