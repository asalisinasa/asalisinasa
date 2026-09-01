const LOCAL_SITE_URL = "http://localhost:3000";

function ensureProtocol(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

const configuredSiteUrl =
  process.env.SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  LOCAL_SITE_URL;

export const siteUrl = new URL(ensureProtocol(configuredSiteUrl)).origin;
