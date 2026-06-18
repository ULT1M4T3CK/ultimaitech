import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImmersiveScenePage } from "@/components/pages/immersive-scene-page";
import { StudioClosingSection } from "@/components/ui/studio-closing-section";
import { AnimatedSectionHeading } from "@/components/ui/animated-section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealSection } from "@/components/ui/reveal-section";
import { UseCaseDeck } from "@/components/ui/use-case-deck";
import { getDictionary, type Locale } from "@/lib/locales";

type ProjectsPageProps = { params: Promise<{ locale: string }> };

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const { projects, slugs } = dict;

  const deckCases = projects.cases.map((project) => ({
    slug: project.slug,
    label: project.label,
    title: project.title,
    subtitle: project.subtitle,
    image: project.image,
    imageAlt: project.imageAlt,
    href: `${slugs.projects}${project.slug}/`,
    ctaLabel: projects.caseStudyUi.ctaFullCase,
  }));

  const overlay = (
    <>
      <p className="text-sm leading-relaxed text-text-muted">
        {projects.intro.text}
      </p>
      <div className="space-y-3">
        {projects.cases.map((project) => (
          <Link
            key={project.slug}
            href={`${slugs.projects}${project.slug}/`}
            className="block rounded-xl border border-border bg-surface p-3 transition-colors hover:border-accent/30"
          >
            <p className="text-sm font-semibold text-text">{project.title}</p>
            <p className="mt-1 line-clamp-2 text-xs text-text-muted">
              {project.subtitle}
            </p>
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
      <RevealSection className="section-offset-grid">
        <AnimatedSectionHeading
          title={projects.intro.title}
          subtitle={projects.intro.text}
        />
        <div className="editorial-panel p-6">
          <p className="editorial-eyebrow">{dict.services.approach.label}</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-text">
            {dict.services.approach.title}
          </h2>
          <ul className="mt-5 space-y-3">
            {dict.services.approach.points.map((point) => (
              <li
                key={point}
                className="text-sm leading-relaxed text-text-muted"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </RevealSection>

      <RevealSection>
        <UseCaseDeck cases={deckCases} />
      </RevealSection>

      <RevealSection className="page-band -mx-6 px-6 py-14 md:-mx-10 md:px-10">
        <div className="relative z-10 grid gap-4 md:grid-cols-3">
          {projects.cases.map((project) => (
            <GlassCard
              key={`${project.slug}-summary`}
              data-case-panel={project.slug}
              className="scroll-mt-28 p-5 transition-colors"
              hover={false}
            >
              <h3 className="font-display text-lg font-semibold text-text">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {project.challenge.intro}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {project.solution.intro}
              </p>
              <Link
                href={`${slugs.projects}${project.slug}/`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover"
              >
                {projects.caseStudyUi.ctaFullCase}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </GlassCard>
          ))}
        </div>
      </RevealSection>

      <StudioClosingSection
        headline={projects.cta.headline}
        subtext={projects.cta.text}
        primaryLabel={projects.cta.button}
        primaryHref={slugs.contact}
        secondaryLabel={projects.cta.secondary}
        secondaryHref={slugs.services}
        responseNote={dict.closing.responseNote}
        email={dict.contact.info.email}
      />
    </ImmersiveScenePage>
  );
}
