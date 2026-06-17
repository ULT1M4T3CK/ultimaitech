import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Locale } from "@/lib/locales";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  lang: string;
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
};

export { blogPostHref } from "@/lib/blog-paths";

const POSTS_DIR = path.join(process.cwd(), "public/blog/md/posts");

function readPostFile(
  filePath: string,
): { meta: BlogPostMeta; content: string } | null {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug =
    typeof data.slug === "string"
      ? data.slug
      : path.basename(filePath, ".md").replace(/^blog-\d+-/, "");

  return {
    meta: {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      lang: String(data.lang ?? "nl"),
    },
    content,
  };
}

function listPostFiles(locale: Locale): string[] {
  const dir = path.join(POSTS_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(dir, name));
}

export function getBlogPosts(locale: Locale): BlogPostMeta[] {
  return listPostFiles(locale)
    .map((filePath) => readPostFile(filePath)?.meta)
    .filter((meta): meta is BlogPostMeta => meta !== undefined)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(locale: Locale, slug: string): BlogPost | null {
  for (const filePath of listPostFiles(locale)) {
    const parsed = readPostFile(filePath);
    if (!parsed || parsed.meta.slug !== slug) continue;

    return {
      ...parsed.meta,
      contentHtml: marked.parse(parsed.content) as string,
    };
  }
  return null;
}

export function getAllBlogSlugs(locale: Locale): string[] {
  return getBlogPosts(locale).map((post) => post.slug);
}
