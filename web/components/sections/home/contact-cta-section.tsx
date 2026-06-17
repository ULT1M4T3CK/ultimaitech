import { StudioClosingSection } from "@/components/ui/studio-closing-section";
import type { Dictionary } from "@/lib/locales";
type ContactCtaSectionProps = { dict: Dictionary };
export function ContactCtaSection({ dict }: ContactCtaSectionProps) {
  const { closing, slugs, contact } = dict;
  return (
    <div data-narrative-section="contact" className="narrative-section">
      <StudioClosingSection
        eyebrow={closing.eyebrow}
        headline={closing.headline}
        subtext={closing.subtext}
        primaryLabel={closing.primary}
        primaryHref={slugs.contact}
        secondaryLabel={closing.secondary}
        secondaryHref={slugs.services}
        responseNote={closing.responseNote}
        email={contact.info.email}
      />
    </div>
  );
}
