import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";
import { apiVersion, dataset, projectId } from "./env";

export default defineConfig({
    name: "asalisinasa-studio",
    title: "asalisinasa Studio",
    projectId,
    dataset,
    apiVersion,
    plugins: [
        structureTool({ structure }),
        presentationTool({
            previewUrl: {
                origin:
                    process.env.SANITY_STUDIO_PREVIEW_ORIGIN || "http://localhost:3000",
                previewMode: {
                    enable: "/api/draft-mode/enable",
                },
            },
        }),
        visionTool(),
    ],
    schema: { types: schemaTypes },
});