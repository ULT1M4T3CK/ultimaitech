import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedPageHero } from "@/components/ui/animated-page-hero";
import { AnimatedSectionHeading } from "@/components/ui/animated-section-heading";
import { RevealSection } from "@/components/ui/reveal-section";
import { blogPostHref, getBlogPosts } from "@/lib/blog";
import { getDictionary, type Locale } from "@/lib/locales";
type PageProps = { params: Promise<{ locale: string }> };
export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const { blog } = dict;
  const posts = getBlogPosts(locale as Locale);
  return (
    <div>
      <AnimatedPageHero
        label={blog.hero.label}
        title={blog.hero.title}
        description={blog.hero.description}
      />
      <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
        <RevealSection>
          <AnimatedSectionHeading
            title={blog.intro.title}
            subtitle={blog.intro.text}
          />
        </RevealSection>
        {posts.length > 0 && (
          <RevealSection>
            <div className="grid gap-4 md:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={blogPostHref(dict.slugs.blog, post.slug)}
                  className="editorial-panel group block p-6 transition-colors hover:border-accent/30"
                >
                  <time className="text-xs font-semibold uppercase tracking-widest text-text-faint">
                    {post.date}
                  </time>
                  <h2 className="mt-3 font-display text-xl font-semibold text-text group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {post.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    {blog.readMore} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </RevealSection>
        )}
        <RevealSection>
          <AnimatedSectionHeading
            label={blog.topics.label}
            title={blog.topics.title}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {blog.topics.items.map((topic) => (
              <div key={topic.title} className="studio-surface rounded-2xl p-6">
                <h2 className="font-display text-lg font-semibold text-text">
                  {topic.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {topic.text}
                </p>
              </div>
            ))}
          </div>
        </RevealSection>
        <RevealSection className="section-offset-grid page-band -mx-6 px-6 py-14 md:-mx-10 md:px-10">
          <div className="relative z-10">
            <AnimatedSectionHeading
              title={blog.whyRead.title}
              subtitle={blog.whyRead.text}
            />
          </div>
          <div className="editorial-panel relative z-10 p-6">
            <h2 className="font-display text-2xl font-semibold text-text">
              {dict.home.region.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              {dict.home.region.text}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {dict.home.region.areas.map((area) => (
                <span
                  key={area}
                  className="rounded-lg border border-border bg-surface-raised px-3 py-2 text-xs font-semibold text-text-muted"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </RevealSection>
        <RevealSection>
          <AnimatedSectionHeading title={blog.faq.title} />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {blog.faq.items.map((item) => (
              <div key={item.q} className="studio-surface rounded-2xl p-5">
                <h2 className="font-display text-lg font-semibold text-text">
                  {item.q}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
