import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { BLOG_POSTS } from "@/lib/sample-data/content";
import { SAMPLE_COURSES } from "@/lib/sample-data/courses";

/**
 * Static routes + one entry per sample course/blog post, matching P0 §18's
 * indexable set: home, pricing, catalog, course detail pages, the
 * free-preview first lesson of each course, and blog. Everything else is
 * excluded per NOINDEX_ROUTE_PREFIXES (see robots.ts).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/pricing`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/courses`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const courseRoutes: MetadataRoute.Sitemap = SAMPLE_COURSES.flatMap((course) => {
    const freeLesson = course.modules.flatMap((m) => m.lessons).find((l) => l.free);
    const entries: MetadataRoute.Sitemap = [
      { url: `${SITE_URL}/courses/${course.slug}`, changeFrequency: "weekly", priority: 0.8 },
    ];
    if (freeLesson) {
      entries.push({
        url: `${SITE_URL}/courses/${course.slug}/${freeLesson.slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    return entries;
  });

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes];
}
