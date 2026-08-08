import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./env";

export default defineCliConfig({
    api: { dataset, projectId },
    deployment: {
        appId: process.env.SANITY_STUDIO_APP_ID,
    },
    typegen: {
        enabled: true,
        path: "../src/**/*.{ts,tsx,js,jsx}",
        schema: "schema.json",
        generates: "../src/sanity.types.ts",
        overloadClientMethods: true,
    },
});