import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { BLOG_POSTS } from "@/lib/sample-data/content";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className={styles.article}>
      <div className={styles.metaRow}>
        <Badge tone="neutral">{post.tag}</Badge>
        <p className={styles.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          · {post.readMinutes} min read
        </p>
      </div>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.byline}>
        <Avatar fallback={post.authorInitials} size="sm" />
        <span>{post.author}</span>
      </div>
      <p className={styles.lede}>{post.excerpt}</p>
      <div className={styles.body}>
        <p>
          {post.excerpt} That’s the short version — the longer one is that most product decisions in
          Curitiq trace back to this same instinct, applied over and over until it became a design
          system rather than a slogan.
        </p>
        <p>
          It’s easy to say &ldquo;we value calm learning&rdquo; in a pitch deck. It’s harder to say
          no to a leaderboard when a competitor ships one and it moves their engagement numbers. We
          think the discipline of saying no consistently is the actual product.
        </p>
        <p>
          The tell, for us, is whether a feature survives someone using Curitiq at 11pm after a long
          day. Streaks that guilt you don’t survive that test. A quiet progress page that just tells
          you the truth does. That’s the bar every new idea has to clear before it ships.
        </p>
      </div>
    </article>
  );
}
