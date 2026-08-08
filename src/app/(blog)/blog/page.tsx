import type { Metadata } from "next";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { BLOG_POSTS } from "@/lib/sample-data/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on learning design, AI tutoring, and building Curitiq.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Blog</h1>
      <p className={styles.subtitle}>
        Notes on learning design, AI tutoring, and building Curitiq.
      </p>
      <ul className={styles.list}>
        {BLOG_POSTS.map((post) => (
          <li key={post.slug} className={styles.item}>
            <Link href={`/blog/${post.slug}`} className={styles.link}>
              <div className={styles.metaRow}>
                <Badge tone="neutral">{post.tag}</Badge>
                <p className={styles.postDate}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  · {post.readMinutes} min read
                </p>
              </div>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
              <div className={styles.author}>
                <Avatar fallback={post.authorInitials} size="sm" />
                <span>{post.author}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
