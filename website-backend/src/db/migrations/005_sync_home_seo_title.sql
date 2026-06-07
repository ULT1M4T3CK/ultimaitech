-- Align stored home page SEO with current defaults (tagline + meta).
-- Safe to re-run: only updates when the row still has the previous home title or no "/" key.

UPDATE site_settings
SET
  seo = jsonb_set(
    COALESCE(seo, '{}'::jsonb),
    '{/}',
    $HOME$
{
  "title": "ultimAItech - Technology that empowers your potential",
  "description": "Technology that empowers your potential: conversion-focused websites, VYBR!S chatbots, and production-minded AI infrastructure planning from ultimAItech.",
  "canonical": "https://ultimaitech.com/",
  "ogTitle": "ultimAItech - Technology that empowers your potential",
  "ogDescription": "We help teams launch faster with web delivery, VYBR!S chatbot rollout paths, and AI infrastructure guidance — technology that empowers your potential.",
  "ogImage": "https://ultimaitech.com/og-image.png",
  "ogType": "website",
  "twitterCard": "summary_large_image",
  "twitterTitle": "ultimAItech - Technology that empowers your potential",
  "twitterDescription": "Technology that empowers your potential — websites, VYBR!S chatbots, and AI infrastructure guidance.",
  "twitterImage": "https://ultimaitech.com/og-image.png"
}
$HOME$::jsonb,
    true
  ),
  updated_at = NOW()
WHERE id = 1
  AND (
    seo->'/'->>'title' = 'ultimAItech - Enterprise-ready websites, AI assistants, and infrastructure'
    OR seo->'/' IS NULL
  );
