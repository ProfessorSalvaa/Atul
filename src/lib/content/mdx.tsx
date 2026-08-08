/**
 * Shared MDX rendering setup. `MDXBody` wraps `next-mdx-remote/rsc`'s
 * `MDXRemote` with the interactive-component map every piece of lesson/
 * course prose is allowed to embed. Add a new embeddable component here
 * (and only here) — content authors then get it for free in any .mdx
 * file without further app code changes, per the M2.75 objective.
 */
import { MDXRemote } from "next-mdx-remote/rsc";
import { CodeBlock } from "@/components/learning/CodeBlock";
import { Flashcard } from "@/components/learning/Flashcard";

const mdxComponents = {
  CodeBlock,
  Flashcard,
};

export function MDXBody({ source }: { source: string }) {
  if (!source.trim()) return null;
  return <MDXRemote source={source} components={mdxComponents} />;
}
