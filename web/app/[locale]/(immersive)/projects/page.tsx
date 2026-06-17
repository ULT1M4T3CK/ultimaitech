import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImmersiveScenePage } from "@/components/pages/immersive-scene-page";
import { StudioClosingSection } from "@/components/ui/studio-closing-section";
import { AnimatedSectionHeading } from "@/components/ui/animated-section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealSection } from "@/components/ui/reveal-section";
import { getDictionary, type Locale } from "@/lib/locales";
type ProjectsPageProps = { params: Promise<{ locale: string }> };
export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const { projects, slugs } = dict;
  const [featured, ...secondary] = projects.cases;
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
      {featured && (
        <RevealSection className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
          <GlassCard className="overflow-hidden" hover glow>
            <Link href={`${slugs.projects}${featured.slug}/`}>
              <div className="relative aspect-[16/9] bg-surface">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <div className="space-y-4 p-6">
                <p className="editorial-eyebrow">{featured.label}</p>
                <h2 className="font-display text-3xl font-semibold text-text">
                  {featured.title}
                </h2>
                <p className="prose-readable text-sm">{featured.description}</p>
                <ul className="grid gap-2 pt-2 md:grid-cols-2">
                  {featured.highlights.slice(0, 4).map((highlight) => (
                    <li
                      key={highlight}
                      className="text-sm leading-relaxed text-text-muted"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  {projects.caseStudyUi.ctaFullCase}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </GlassCard>
          <div className="grid gap-4">
            {secondary.map((project) => (
              <GlassCard key={project.slug} className="p-5" hover>
                <Link
                  href={`${slugs.projects}${project.slug}/`}
                  className="block space-y-3"
                >
                  <p className="editorial-eyebrow">{project.label}</p>
                  <h2 className="font-display text-xl font-semibold text-text">
                    {project.title}
                  </h2>
                  <p className="text-sm font-medium leading-relaxed text-text">
                    {project.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {project.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    {projects.caseStudyUi.ctaFullCase}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </GlassCard>
            ))}
          </div>
        </RevealSection>
      )}
      <RevealSection className="page-band -mx-6 px-6 py-14 md:-mx-10 md:px-10">
        <div className="relative z-10 grid gap-4 md:grid-cols-3">
          {projects.cases.map((project) => (
            <GlassCard
              key={`${project.slug}-summary`}
              className="p-5"
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
