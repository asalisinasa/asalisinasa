export const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-07";

const FALLBACK_DATASET = "production";

export const dataset =
    process.env.NEXT_PUBLIC_SANITY_DATASET || FALLBACK_DATASET;

export const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
        throw new Error(errorMessage);
    }

    return v;
}

void assertValue(dataset, "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET");
void assertValue(projectId, "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID");