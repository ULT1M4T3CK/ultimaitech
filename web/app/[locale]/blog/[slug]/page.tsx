import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AnimatedPageHero } from "@/components/ui/animated-page-hero";
import { RevealSection } from "@/components/ui/reveal-section";
import { getBlogPost, getAllBlogSlugs } from "@/lib/blog";
import { getDictionary, locales, type Locale } from "@/lib/locales";
type PageProps = { params: Promise<{ locale: string; slug: string }> };
export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllBlogSlugs(locale).map((slug) => ({ locale, slug })),
  );
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(locale as Locale, slug);
  if (!post) return { title: "Blog | ultimAItech" };
  return {
    title: `${post.title} | ultimAItech`,
    description: post.description,
  };
}
export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const dict = getDictionary(locale as Locale);
  const post = getBlogPost(locale as Locale, slug);
  if (!post) notFound();
  return (
    <article>
      <AnimatedPageHero
        label={dict.blog.hero.label}
        title={post.title}
        description={post.description}
      />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <RevealSection>
          <div
            className="blog-prose prose-readable space-y-4 text-base leading-relaxed text-text-muted [&_a]:text-accent [&_a]:underline [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-text [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-text [&_li]:ml-5 [&_li]:list-disc [&_ol]:space-y-2 [&_p]:leading-relaxed [&_strong]:text-text [&_ul]:space-y-2"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </RevealSection>
        <div className="mt-12 border-t border-border pt-8">
          <Link
            href={dict.slugs.blog}
            className="text-sm font-semibold text-accent hover:text-accent-hover"
          >
            ← {dict.blog.hero.title}
          </Link>
        </div>
      </div>
    </article>
  );
}
