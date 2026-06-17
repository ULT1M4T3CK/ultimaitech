import { AnimatedSectionHeading } from "@/components/ui/animated-section-heading";
import { AnimatedStat } from "@/components/ui/animated-stat";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealSection } from "@/components/ui/reveal-section";
import { resolveIcon } from "@/lib/icon-map";
import { isImmersiveStudioEnabled } from "@/lib/immersive-config";
import type { Dictionary } from "@/lib/locales";
type TrustSectionProps = { dict: Dictionary };
export function TrustSection({ dict }: TrustSectionProps) {
  const studio = isImmersiveStudioEnabled();
  const nexus = dict.home.nexus;
  return (
    <RevealSection data-narrative-section="trust" className="narrative-section">
      <div className="mx-auto w-full max-w-6xl space-y-12 px-6">
        <AnimatedSectionHeading
          label={dict.home.socialProof.label}
          title={
            studio
              ? (nexus?.trustHeadline ?? dict.home.intro.title)
              : dict.home.intro.title
          }
          subtitle={dict.home.intro.text}
        />
        <div className="grid gap-8 md:grid-cols-3">
          {dict.home.socialProof.items.map((item, index) => (
            <AnimatedStat
              key={item.label}
              value={item.value}
              label={item.label}
              delay={index * 0.08}
            />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {dict.home.principles.map((principle) => {
            const Icon = resolveIcon(principle.icon);
            return (
              <GlassCard key={principle.title} className="p-6" hover>
                <div className="icon-frame mb-4 h-10 w-10">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-text">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {principle.text}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
