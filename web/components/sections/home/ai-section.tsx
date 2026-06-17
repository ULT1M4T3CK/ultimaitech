import { BotMessageSquare, Cable, Workflow } from "lucide-react";
import { AnimatedSectionHeading } from "@/components/ui/animated-section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { MetalButton } from "@/components/ui/metal-button";
import { RevealSection } from "@/components/ui/reveal-section";
import { isImmersiveStudioEnabled } from "@/lib/immersive-config";
import type { Dictionary } from "@/lib/locales";
type AiSectionProps = { dict: Dictionary };
const AI_CARDS = [
  { icon: BotMessageSquare, key: "chatbot" },
  { icon: Cable, key: "integration" },
  { icon: Workflow, key: "automation" },
] as const;
export function AiSection({ dict }: AiSectionProps) {
  const studio = isImmersiveStudioEnabled();
  const nexus = dict.home.nexus;
  const cards = [
    {
      title: dict.home.services[2]?.title ?? "AI & chatbots",
      text: dict.home.services[2]?.text ?? "",
    },
    {
      title: dict.software.capabilities[1]?.title ?? "Koppelingen",
      text: dict.software.capabilities[1]?.text ?? "",
    },
    {
      title: dict.software.capabilities[2]?.title ?? "Automatisering",
      text: dict.software.capabilities[2]?.text ?? "",
    },
  ];
  return (
    <RevealSection data-narrative-section="ai" className="narrative-section">
      <div className="mx-auto w-full max-w-6xl space-y-10 px-6">
        <AnimatedSectionHeading
          label={studio ? (nexus?.aiLabel ?? "AI") : dict.aiChatbots.hero.label}
          title={
            studio
              ? (nexus?.aiTitle ?? "Slimme systemen op uw eigen content")
              : dict.aiChatbots.hero.title
          }
          subtitle={
            studio
              ? (nexus?.aiIntro ?? dict.aiChatbots.hero.description)
              : dict.aiChatbots.hero.description
          }
        />
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {cards.map((card, index) => {
            const Icon = AI_CARDS[index]?.icon ?? BotMessageSquare;
            const offset =
              index === 1 ? "md:mt-8" : index === 2 ? "md:mt-4" : "";
            return (
              <GlassCard
                key={card.title}
                className={`p-6 ${offset}`}
                hover
                glow={index === 1}
              >
                <div className="icon-frame mb-4 h-11 w-11">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-text">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {card.text}
                </p>
              </GlassCard>
            );
          })}
        </div>
        <div className="studio-surface border-l-2 border-l-accent rounded-2xl p-6 md:p-8">
          <p className="max-w-3xl text-base leading-relaxed text-text-muted">
            {studio
              ? (nexus?.aiCallout ?? dict.aiChatbots.whatIs.text)
              : dict.aiChatbots.whatIs.text}
          </p>
          <MetalButton
            href={dict.slugs.aiChatbots}
            className="mt-5"
            variant="secondary"
          >
            {dict.home.services[2]?.cta ?? "Meer over AI"}
          </MetalButton>
        </div>
      </div>
    </RevealSection>
  );
}
