"use client";
import { useState } from "react";
import { AnimatedPageHero } from "@/components/ui/animated-page-hero";
import { AnimatedSectionHeading } from "@/components/ui/animated-section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { MetalButton } from "@/components/ui/metal-button";
import { RevealSection } from "@/components/ui/reveal-section";
import type { Dictionary } from "@/lib/locales";
type ContactPageContentProps = { dict: Dictionary };
function ContactForm({ dict }: { dict: Dictionary }) {
  const { form } = dict.contact;
  const [submitted, setSubmitted] = useState(false);
  if (submitted) {
    return (
      <GlassCard className="p-8 text-center" glow>
        <h2 className="font-display text-2xl font-semibold text-text">
          {form.successTitle}
        </h2>
        <p className="mt-3 text-sm text-text-muted">{form.successText}</p>
      </GlassCard>
    );
  }
  return (
    <GlassCard className="p-6 md:p-8" glow>
      <form
        className="space-y-5"
        action="https://formsubmit.co/info@ultimaitech.com"
        method="POST"
        onSubmit={() => setSubmitted(true)}
      >
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="Contact via ultimAItech" />
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-text">
              {form.nameLabel}
            </span>
            <input
              className="form-input-premium"
              name="name"
              required
              placeholder={form.namePlaceholder}
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-text">
              {form.emailLabel}
            </span>
            <input
              className="form-input-premium"
              type="email"
              name="email"
              required
              placeholder={form.emailPlaceholder}
            />
          </label>
        </div>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-text">
            {form.companyLabel}
          </span>
          <input
            className="form-input-premium"
            name="company"
            placeholder={form.companyPlaceholder}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-text">
            {form.intentLabel}
          </span>
          <select
            className="form-input-premium"
            name="intent"
            required
            defaultValue=""
          >
            <option value="" disabled>
              —
            </option>
            {form.intentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-text">
            {form.messageLabel}
          </span>
          <textarea
            className="form-input-premium min-h-32 resize-y"
            name="message"
            required
            placeholder={form.messagePlaceholder}
          />
        </label>
        <MetalButton type="submit">{form.submit}</MetalButton>
      </form>
    </GlassCard>
  );
}
export function ContactPageContent({ dict }: ContactPageContentProps) {
  const { contact } = dict;
  return (
    <div>
      <AnimatedPageHero
        label={contact.hero.label}
        title={contact.hero.title}
        description={contact.hero.description}
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <ContactForm dict={dict} />
        <div className="space-y-8">
          <RevealSection>
            <AnimatedSectionHeading title={contact.info.title} />
            <GlassCard className="mt-6 space-y-4 p-6">
              <p className="text-sm">
                <span className="font-semibold text-text">
                  {contact.info.email}
                </span>
              </p>
              <p className="text-sm text-text-muted">{contact.info.location}</p>
              <p className="text-sm text-text-muted">
                {contact.info.availability}
              </p>
            </GlassCard>
          </RevealSection>
          <RevealSection>
            <AnimatedSectionHeading
              label={contact.process.label}
              title={contact.process.title}
            />
            <ol className="mt-6 space-y-3">
              {contact.process.steps.map((step) => (
                <li key={step.title} className="studio-surface rounded-xl p-4">
                  <h3 className="font-semibold text-text">{step.title}</h3>
                  <p className="mt-1 text-sm text-text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </RevealSection>
        </div>
      </div>
      <section className="page-band px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <AnimatedSectionHeading
            label={contact.topics.label}
            title={contact.topics.title}
            subtitle={contact.region.text}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {contact.topics.items.map((item, index) => (
              <GlassCard
                key={item.title}
                className={index % 2 === 1 ? "p-5 lg:mt-8" : "p-5"}
                hover
              >
                <h3 className="font-display text-lg font-semibold text-text">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {item.text}
                </p>
              </GlassCard>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {contact.region.areas.map((area) => (
              <span
                key={area}
                className="rounded-lg border border-border bg-surface-raised px-3 py-2 text-xs font-semibold text-text-muted"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <AnimatedSectionHeading title={contact.faq.title} />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {contact.faq.items.map((item) => (
            <GlassCard key={item.q} className="p-5" hover={false}>
              <h2 className="font-display text-lg font-semibold text-text">
                {item.q}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {item.a}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
