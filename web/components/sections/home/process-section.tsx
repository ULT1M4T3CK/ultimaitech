import { AnimatedSectionHeading } from '@/components/ui/animated-section-heading';
import { RevealSection } from '@/components/ui/reveal-section';
import { isImmersiveStudioEnabled } from '@/lib/immersive-config';
import type { Dictionary } from '@/lib/locales';

type ProcessSectionProps = {
  dict: Dictionary;
};

export function ProcessSection({ dict }: ProcessSectionProps) {
  const studio = isImmersiveStudioEnabled();
  const nexus = dict.home.nexus;
  const steps = dict.home.howWeWork.steps;

  return (
    <RevealSection data-narrative-section="process" className="narrative-section">
      <div className="mx-auto w-full max-w-6xl space-y-12 px-6">
        <AnimatedSectionHeading
          label={dict.home.howWeWork.label}
          title={studio ? (nexus?.processTitle ?? dict.home.howWeWork.title) : dict.home.howWeWork.title}
          subtitle={dict.home.howWeWork.subtitle}
        />

        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.step} className="relative">
              {index < steps.length - 1 && (
                <span
                  className="absolute right-0 top-8 hidden h-px w-8 translate-x-full bg-gradient-to-r from-accent/50 to-transparent lg:block"
                  aria-hidden
                />
              )}
              <div className="glass-spec-panel h-full rounded-2xl p-5">
                <p className="font-mono text-sm font-semibold text-accent">{step.step}</p>
                <h3 className="mt-3 font-display text-lg font-semibold text-text">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </RevealSection>
  );
}
