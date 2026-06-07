import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ImmersiveScenePage } from '@/components/pages/immersive-scene-page';
import { AnimatedCtaBand } from '@/components/ui/animated-cta-band';
import { GlassCard } from '@/components/ui/glass-card';
import { RevealSection } from '@/components/ui/reveal-section';
import { getDictionary, type Locale } from '@/lib/locales';

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const { projects, slugs } = dict;

  const overlay = (
    <>
      <p className="text-sm leading-relaxed text-text-muted">{projects.intro.text}</p>
      <div className="space-y-3">
        {projects.cases.map((project) => (
          <Link
            key={project.slug}
            href={`${slugs.projects}${project.slug}/`}
            className="block rounded-xl border border-border bg-surface/50 p-3 transition-colors hover:border-accent/30"
          >
            <p className="text-sm font-semibold text-text">{project.title}</p>
            <p className="mt-1 line-clamp-2 text-xs text-text-muted">{project.subtitle}</p>
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <ImmersiveScenePage
      dict={dict}
      label={projects.hero.label}
      title={projects.hero.title}
      description={projects.hero.description}
      overlayContent={overlay}
    >
      <RevealSection>
        <p className="max-w-3xl text-base leading-relaxed text-text-muted">{projects.intro.text}</p>
      </RevealSection>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.cases.map((project) => (
          <GlassCard key={project.slug} className="overflow-hidden" hover>
            <Link href={`${slugs.projects}${project.slug}/`}>
              <div className="relative aspect-[16/10] bg-surface">
                <Image src={project.image} alt={project.imageAlt} fill className="object-cover" sizes="33vw" />
              </div>
              <div className="space-y-2 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">{project.label}</p>
                <h2 className="font-display text-xl font-semibold text-text">{project.title}</h2>
                <p className="text-sm text-text-muted">{project.subtitle}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  {projects.caseStudyUi.ctaFullCase}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </GlassCard>
        ))}
      </div>
      <AnimatedCtaBand
        headline={projects.cta.headline}
        subtext={projects.cta.text}
        primaryLabel={projects.cta.button}
        primaryHref={slugs.contact}
        secondaryLabel={projects.cta.secondary}
        secondaryHref={slugs.services}
      />
    </ImmersiveScenePage>
  );
}
