import { sanityClient } from "@/sanity/client";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { token } from "@/sanity/lib/token";

export const { GET } = defineEnableDraftMode({
  client: sanityClient.withConfig({ token }),
});
