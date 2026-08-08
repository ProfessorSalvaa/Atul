import type { MetadataRoute } from "next";
import { NOINDEX_ROUTE_PREFIXES, SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const disallow = NOINDEX_ROUTE_PREFIXES.flatMap((prefix) => [prefix, `${prefix}/`]);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
