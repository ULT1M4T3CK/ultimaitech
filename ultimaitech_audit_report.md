# SEO & AI Search Optimization Audit — ultimaitech.com

**Date:** 2026-06-14
**Overall Score: 8.0/10** — Technically excellent foundation, but ranking authority and content gaps hold it back.

---

## Scoreboard

| Category                  | Score  | Notes                                              |
|---------------------------|--------|----------------------------------------------------|
| Technical SEO             | 9/10   | Near-perfect fundamentals                          |
| On-Page SEO               | 8/10   | Good titles/H1s/descriptions, minor issues         |
| Structured Data           | 8/10   | Rich schema, a few fixable gaps                    |
| Content                   | 7/10   | Strong blog, but thin case studies & few images    |
| Security Headers          | 7/10   | 5/7 headers present                               |
| Performance               | 9/10   | Excellent — FCP 652ms, TTFB 228ms                  |
| AI Search Optimization    | 9/10   | Best-in-class llms.txt setup, one robots.txt issue |
| Ranking Authority         | 4/10   | Not visible for any non-branded keyword            |
| Local SEO                 | 5/10   | Missing Google Business Profile, reviews, backlinks|

---

## ⭐ What's Excellent

### Technical SEO (9/10)
- **All 18 audited pages** return 200 with unique titles, unique meta descriptions, proper H1s
- Title lengths: 27–76 chars (all within ideal range)
- Meta descriptions: 126–177 chars (good)
- Canonical tags set correctly on every page
- Hreflang: 4 tags (nl, de, en, x-default) on every page — flawless implementation
- All images have alt text (0 missing across the site)
- `viewport` meta tag present on all pages
- No `robots: noindex` on any content page
- Next.js with SSR — pages render server-side (SEO-friendly)

### Performance (9/10)
- TTFB: 228ms
- First Contentful Paint: 652ms
- DOM Content Loaded: 310ms
- Full load: 425ms
- Cloudflare CDN + zstd compression
- Transfer size: ~14 KB (homepage)
- Only 34 resources loaded

### AI Search Optimization (9/10)
- `llms.txt` — well-structured curated index with entity facts, key pages per language, links to full content
- `llms-full.txt` — comprehensive: entity data, page summaries in 3 languages, case studies, blog index with excerpts
- `ai-content.md` — structured site map for AI crawlers
- `blog/md/index.md` — markdown index of all blog posts with direct .md links
- Individual blog posts available as .md files
- Custom robots.txt rules explicitly Allow AI crawlers (GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, etc.)

### Structured Data (8/10)
- Organization + Person + WebSite `@graph` on every page
- `ProfessionalService` schema on homepage (nl/de/en)
- `FAQPage` schema on /diensten/
- `BlogPosting` schema with author, datePublished, publisher on blog posts
- `BreadcrumbList` schema on blog posts
- `SearchAction` potential action on WebSite schema
- `sameAs` links: LinkedIn, GitHub, Google profile

### Content (7/10)
- 10 blog posts, each in 3 languages (NL/DE/EN) — 30 total pages of content
- Blog posts: 1,000–1,150+ words each — solid depth
- Service pages: 729–757 words with FAQs
- 3 case studies with structured deliverables

---

## 🚨 Critical Issues

### 1. robots.txt Conflicting Rules
The Cloudflare Managed Content section **blocks** every major AI crawler with `Disallow: /`:
```
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /
```

Then your custom section below re-allows them:
```
User-agent: GPTBot
User-agent: ChatGPT-User
Allow: /
```

**Problem:** Per the robots.txt spec, when multiple groups match, the most specific rule wins (RFC 9309). However, some older crawlers follow the first matching group. The Cloudflare-managed blocks appear first, which may cause AI bots to stop crawling entirely. This directly undermines your llms.txt and AI optimization work.

**Fix:** In Cloudflare's dashboard → Bots → AI Bots & Crawlers, switch GPTBot, ClaudeBot, Google-Extended, etc. from "Block" to "Allow". This removes the Cloudflare-managed `Disallow` entries, leaving only your custom Allow rules.

### 2. Not Ranking for Any Target Keyword
```
Query                                  Ranking
─────────────────────────────────────  ────────
"website laten maken Wanneperveen"     Not visible ❌
"website laten maken Drenthe"          Not visible ❌
"website laten maken Overijssel"       Not visible ❌
"webdesigner Meppel"                   Not visible ❌
"webdesigner Steenwijk"                Not visible ❌
"maatwerk website Overijssel"          Not visible ❌
"software ontwikkelaar Drenthe"        Not visible ❌
"AI chatbot website MKB"               Not visible ❌
"web developer Wanneperveen"           Not visible ❌
"Website erstellen lassen Niedersachsen" Not visible ❌
```

Competitors like Coding Agency (Meppel), GrowthDigital, VrijdagOnline, and Skyline Webdesign dominate these queries. Coding Agency even mentions "Wanneperveen" in their copy and targets the exact same audience.

### 3. Brand Name Confusion in Search
Searching "ultimAItech" returns **ultimateaitech.org** (a blockchain/DeFi company) as result #1. Your website does not appear in the top results. Andre's LinkedIn profile appears, but the domain itself isn't ranking for its own brand. This is a serious discovery issue.

---

## 🔧 Important Issues

### 4. No `Sitemap:` Directive in robots.txt
The robots.txt doesn't include a `Sitemap:` line. While the sitemap.xml exists and is properly structured (with hreflang alternates), search engines need to discover it. Add:
```
Sitemap: https://ultimaitech.com/sitemap.xml
```

### 5. sitemap.xml Blocked by Cloudflare for Non-Browser Clients
Curl/bot requests to `/sitemap.xml` get a 403 Cloudflare challenge page. Googlebot can typically handle this, but other search engines and SEO tools cannot. Whitelist `/sitemap.xml` in Cloudflare's WAF rules.

### 6. Person Schema Uses "ultimAItech" Instead of Real Name
The Person entity in the `@graph` has:
```json
{"@type": "Person", "name": "ultimAItech", "jobTitle": "Founder & Web Developer"}
```
Google expects a real person's name here. Change to `"name": "Andre Hassler"` to build personal authority and E-E-A-T signals. This affects all pages.

### 7. Missing Content-Security-Policy Header
Security headers present: 5/7
```
✅ strict-transport-security: max-age=63072000; includeSubDomains
✅ x-frame-options: SAMEORIGIN
✅ x-content-type-options: nosniff
✅ referrer-policy: strict-origin-when-cross-origin
✅ permissions-policy: camera=(), microphone=(), geolocation=()
❌ content-security-policy: MISSING
❌ x-xss-protection: MISSING (deprecated — low priority)
```
Add a CSP header to reach 6/7. Example:
```
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'
```

### 8. No External Social/Profile Links in Footer
The footer has 14 links — all internal. The `sameAs` in structured data lists LinkedIn, GitHub, and a Google share link, but there are no clickable social links anywhere in the visible UI. Add social media links (LinkedIn, GitHub, and your new Instagram/Facebook) to the footer.

### 9. Blog Posts Lack Unique OG Images
All blog posts use the generic `/og-image.png` as their OG image. When shared on social media, every post looks identical. Generate unique featured images per post to improve click-through from social shares and Google Discover.

### 10. Blog Posts Missing `dateModified`
The BlogPosting schema has `datePublished` but no `dateModified`. Google uses this to show freshness indicators in search results. Add `dateModified` to every blog post.

### 11. Case Studies Are Thin Content (391–455 words)
While service pages (729–757 words) and blog posts (1,000+ words) are good, the three case studies are thin:
- nijenhuis-botenverhuur: 455 words
- houthandel-jan-sok: 433 words
- wal-beschoeiing: 391 words

Expand each to 800+ words with more detail: challenge, approach, tech stack, results/metrics, client context. These are high-value pages for conversion.

### 12. Almost Zero Images Across the Site
Most pages have 0 images. Only the homepage (2), /de/ (2), /en/ (2), projecten (6), and case studies (1 each) have images. Service pages, blog posts, and the about page have none. This hurts:
- Visual engagement and time-on-page
- Image search traffic (Google Images)
- Social sharing appeal

### 13. Duplicate H2 on /diensten/software/
The page has "Gerelateerde artikelen" as H2 twice. Each H2 should be unique.

### 14. Contact Page Has Duplicate Schema Block
The contact page has 3 schema blocks — the Organization+Person+WebSite graph is included twice (identical). Remove the duplicate.

### 15. Footer Links Missing Trailing Slashes
Footer links use `/contact`, `/over`, `/blog` etc. without trailing slashes, but canonical URLs use `/contact/`, `/over/`, `/blog/`. This causes unnecessary 301 redirects on every footer click. Add trailing slashes to all footer links.

---

## 📋 Top 15 Action Items (Priority Order)

| #  | Action                                          | Impact   | Effort |
|----|------------------------------------------------|----------|--------|
| 1  | Fix robots.txt — remove Cloudflare AI bot blocks | Critical | Low    |
| 2  | Add `Sitemap:` directive to robots.txt          | High     | 5 min  |
| 3  | Whitelist sitemap.xml in Cloudflare WAF         | High     | Low    |
| 4  | Register & optimize Google Business Profile     | Critical | Medium |
| 5  | Change Person schema name to "Andre Hassler"    | High     | Low    |
| 6  | Add `dateModified` to BlogPosting schema        | Medium   | Low    |
| 7  | Create dedicated landing pages per location     | Critical | High   |
|    | (website-laten-maken-meppel, -steenwijk, etc.)  |          |        |
| 8  | Build backlinks: KvK, directories, local press  | Critical | High   |
| 9  | Add Content-Security-Policy header              | Medium   | Medium |
| 10 | Add social media links to footer                | Medium   | Low    |
| 11 | Generate unique OG images per blog post         | Medium   | Medium |
| 12 | Expand case studies to 800+ words               | Medium   | Medium |
| 13 | Add images to service pages and blog posts      | Medium   | Medium |
| 14 | Fix duplicate H2 and schema on affected pages   | Low      | 5 min  |
| 15 | Add trailing slashes to all footer links        | Low      | Low    |

---

## 🏗 Strategy: Breaking Through on Rankings

The site is technically near-perfect — the bottleneck is entirely *authority*. Here's what will move the needle:

### Short term (1–2 weeks)
1. **Google Business Profile** — Register with Wanneperveen address, add photos, services, request reviews from existing clients
2. **Fix robots.txt conflicts** — So your AI optimization actually works
3. **Register on directories** — Trustoo.nl, KvK, Webdesign directories, local business listings (VVV Overijssel, Ondernemers Meppel, etc.)
4. **Submit sitemap to Google Search Console** (if not already done)

### Medium term (1–2 months)
5. **Location-specific landing pages** — Create `/website-laten-maken-meppel/`, `/webdesigner-steenwijk/`, `/website-laten-maken-giethoorn/` etc. These geo-specific pages will rank faster than generic service pages
6. **Expand case studies** with results, metrics, tech stack details
7. **Guest post or get featured** on regional business blogs, Ondernemersplein, tech communities
8. **Social media presence** — Instagram/Facebook (already planned), consistent posting

### Long term (3–6 months)
9. **Build topical authority** — More blog posts targeting long-tail keywords specific to your region
10. **Get client reviews** on Google Business Profile, Trustpilot, Trustoo
11. **Local press** — Reach out to Meppeler Courant, De Stentor, regional tech events
12. **Consider alternative brand signal** — Since "ultimAItech" competes with ultimateaitech.org, consider strengthening "Andre Hassler webdeveloper" as a secondary search identity
