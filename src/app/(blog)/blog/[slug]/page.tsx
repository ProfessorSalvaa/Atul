import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
      <p className={styles.date}>
        {new Date(post.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}{" "}
        · {post.readMinutes} min read
      </p>
      <h1 className={styles.title}>{post.title}</h1>
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
          This post will get a real, fully-authored version once the content pipeline (roadmap
          M4/M5) is in place — for now it’s here so the Blog Layout has something real to render
          against instead of Lorem Ipsum.
        </p>
      </div>
    </article>
  );
}
