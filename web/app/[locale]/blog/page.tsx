import { AnimatedPageHero } from '@/components/ui/animated-page-hero';
import { AnimatedSectionHeading } from '@/components/ui/animated-section-heading';
import { GlassCard } from '@/components/ui/glass-card';
import { RevealSection } from '@/components/ui/reveal-section';
import { getDictionary, type Locale } from '@/lib/locales';

type PageProps = { params: Promise<{ locale: string }> };

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const { blog } = dict;

  return (
    <div>
      <AnimatedPageHero label={blog.hero.label} title={blog.hero.title} description={blog.hero.description} />

      <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
        <RevealSection>
          <AnimatedSectionHeading title={blog.intro.title} subtitle={blog.intro.text} />
        </RevealSection>

        <div className="grid gap-4 md:grid-cols-2">
          {blog.topics.items.map((topic) => (
            <GlassCard key={topic.title} className="p-6" hover>
              <h2 className="font-display text-lg font-semibold text-text">{topic.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{topic.text}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="p-8 text-center" glow>
          <p className="text-sm text-text-muted">{blog.noPosts}</p>
        </GlassCard>
      </div>
    </div>
  );
}
