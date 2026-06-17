"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatedPageHero } from "@/components/ui/animated-page-hero";
import { MetalButton } from "@/components/ui/metal-button";
import type { Dictionary } from "@/lib/locales";
type OfferData = { title: string; clientLabel?: string };
type OfferTokenContentProps = { dict: Dictionary; token: string };
export function OfferTokenContent({ dict, token }: OfferTokenContentProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offer, setOffer] = useState<OfferData | null>(null);
  useEffect(() => {
    if (!token) {
      setError("Invalid link");
      setLoading(false);
      return;
    }
    const load = async () => {
      try {
        const response = await fetch(
          `/api/offers/public/${encodeURIComponent(token)}`,
        );
        const data = (await response.json().catch(() => ({}))) as OfferData & {
          error?: string;
        };
        if (!response.ok)
          throw new Error(data.error ?? `HTTP ${response.status}`);
        setOffer(data);
        document.title = `${data.title} | ultimAItech`;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Proposal unavailable");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [token]);
  const pdfSrc = `/api/offers/public/${encodeURIComponent(token)}/pdf`;
  const pdfDownload = `${pdfSrc}?download=1`;
  return (
    <div>
      <AnimatedPageHero
        title={offer?.title ?? "Proposal"}
        description={
          offer?.clientLabel ? `Prepared for: ${offer.clientLabel}` : undefined
        }
      />
      <div className="mx-auto max-w-4xl space-y-6 px-6 py-16">
        {loading && (
          <p className="text-center text-sm text-text-muted">
            Loading proposal…
          </p>
        )}
        {error && (
          <div className="editorial-panel space-y-4 p-8 text-center">
            <p className="font-semibold text-danger">Proposal unavailable</p>
            <p className="text-sm text-text-muted">{error}</p>
            <MetalButton href={dict.slugs.contact}>
              Contact ultimAItech
            </MetalButton>
          </div>
        )}
        {!loading && !error && offer && (
          <>
            <div className="flex flex-wrap gap-3">
              <MetalButton href={pdfDownload}>Download PDF</MetalButton>
              <Link
                href={dict.slugs.contact}
                className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent-hover"
              >
                {dict.closing.primary} →
              </Link>
            </div>
            <div className="hero-image-frame overflow-hidden">
              <iframe
                title={offer.title}
                src={pdfSrc}
                className="h-[min(80vh,900px)] w-full border-0 bg-surface"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
