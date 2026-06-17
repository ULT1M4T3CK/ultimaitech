import Link from "next/link";
import { AnimatedPageHero } from "@/components/ui/animated-page-hero";
import { MetalButton } from "@/components/ui/metal-button";
import { getDictionary, type Locale } from "@/lib/locales";
type PageProps = { params: Promise<{ locale: string }> };
export default async function OfferIndexPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return (
    <div>
      <AnimatedPageHero
        title="Proposal"
        description="This link is not valid. Proposals are shared via a personal URL with a unique token."
      />
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <MetalButton href={dict.slugs.contact}>Contact ultimAItech</MetalButton>
        <p className="mt-6 text-sm text-text-muted">
          <Link
            href={dict.slugs.home}
            className="text-accent hover:text-accent-hover"
          >
            ← Home
          </Link>
        </p>
      </div>
    </div>
  );
}
