/**
 * Crawler-visible narrative HTML for each public route. Injected before #root by html.js
 * so tools that do not execute JavaScript still see substantive page text (500+ words).
 * Content is visually hidden (off-screen) and aria-hidden; the interactive UI remains in React.
 */
const { query } = require('../db');

function escapeHtmlText(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const HIDDEN_STYLE =
  'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)';

function buildSection(title, paragraphs) {
  const ps = paragraphs
    .filter(Boolean)
    .map((p) => `  <p>${escapeHtmlText(p)}</p>`)
    .join('\n');
  // Cloudflare Email Obfuscation rewrites plain user@domain text into /cdn-cgi/l/email-protection links
  // (404 for crawlers). Wrapping per https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/
  return `<!--email_off-->
<section class="seo-crawler-narrative" aria-hidden="true" style="${HIDDEN_STYLE}">
  <h2>${escapeHtmlText(title)}</h2>
${ps}
</section>
<!--/email_off-->`;
}

function markdownToPlain(md) {
  if (!md) return '';
  return String(md)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*|`]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordCount(text) {
  return String(text)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function splitIntoParagraphs(text, maxWords = 2000) {
  const words = String(text).trim().split(/\s+/).filter(Boolean);
  const slice = words.slice(0, maxWords).join(' ');
  const chunks = slice.split(/\n\n+/).map((c) => c.trim()).filter(Boolean);
  if (chunks.length) return chunks;
  return [slice];
}

/** Appended to short blog posts so crawler-visible HTML clears ~500 words when combined with the article. */
const BLOG_WORDCOUNT_SUPPLEMENT = `Editorial note: this article appears in the ultimAItech blog, which publishes practical guidance for teams evaluating AI assistants, modern web delivery, and production infrastructure. Readers often combine blog posts with the services overview, use cases, demo paths, and Trust Center documentation to build a complete diligence packet before procurement. When an article references implementation details, treat them as general patterns that must be validated against your environment, security policies, and operational constraints. If you need a scoped discussion, use the contact flow with an intent that matches your stage—strategy call, pricing guidance, demo request, or security review—so responses can reference the right stakeholders and timelines. The blog aims for clarity over hype: claims should be testable, and where product behavior is described, it should remain aligned with publicly documented capabilities. For long-term planning, consider how roadmap items across web, chatbots, and infrastructure interact: a faster website can change how assistants are used; assistant rollouts can change support load; infrastructure choices can change cost curves for model operations. ultimAItech encourages cross-functional review so marketing, product, IT, and security teams share assumptions before commitments are made.`;

const BODIES = {
  '/': buildSection('ultimAItech — home', [
    'ultimAItech helps organizations ship modern web experiences, deploy AI assistants, and operate production infrastructure with clearer scope, predictable delivery, and buyer-friendly documentation. The firm focuses on reducing friction before delivery starts: unclear scope, misaligned pricing, and roadmaps that do not connect to buying decisions. When teams need conversion-focused websites, brand-aligned chatbot rollouts, or AI infrastructure guidance, the objective is to align engineering work with measurable business outcomes and procurement realities.',
    'Web development work emphasizes performance, accessibility, SEO foundations, and maintainable builds using modern frameworks and disciplined release practices. VYBR!S chatbot services include evaluation paths, deployment guidance, and governance so assistants stay aligned to approved content. AI infrastructure services cover deployment architecture, operational readiness, and practical support for teams scaling AI systems. Together, these lines give buyers a coherent picture of how implementation, hosting flexibility, and support expectations fit together.',
    'Engagements begin with structured discovery so goals, constraints, and buying context are documented before timelines or investments are committed. Delivery is milestone-based, with documented deliverables and measurable outcomes at each stage. Pricing methodology and trust materials are accessible without forcing every visitor into a generic contact form, so procurement, legal, and security reviewers can move faster with the documents they need.',
    'Proof is presented through verifiable public work and defensible claims rather than invented customer stories. Case studies highlight deployments that can be inspected, and the contact flow supports qualified inquiries, strategy calls, demos, and trust reviews as distinct paths. Security and deployment information is centralized in the Trust Center so enterprise evaluation can proceed with fewer back-and-forth cycles.',
    'If you are comparing services, evaluating VYBR!S, or planning infrastructure for production workloads, the site is organized to route you toward the right next step: services overview, use cases, demo paths, or a scoped conversation. The blog publishes practical notes on AI, web delivery, and infrastructure for teams that want deeper context before committing to a rollout plan.',
    'Organizations evaluating modernization often ask how design systems, analytics instrumentation, and experimentation frameworks fit into a release roadmap. ultimAItech encourages teams to define these requirements during discovery so UX changes do not cascade into late surprises. Accessibility and internationalization are treated as first-class concerns where they affect revenue or compliance, and performance budgets are tracked so marketing teams can ship confidently.',
    'Operational teams also need clarity on ownership, change management, and incident response expectations. When deployments overlap multiple vendors, communication protocols and escalation paths should be defined before production traffic arrives. The firm’s materials support those conversations with realistic language about hosting, support, and trust review requests.',
    'For procurement and security teams, the site provides a repeatable path to request documentation: security reviews, privacy clarification, and deployment-specific questions. These requests are not treated as adversarial; they are expected steps in enterprise buying. Responses should reference how scope, timelines, and environments are governed during delivery.',
    'If you are comparing alternatives, consider whether a vendor offers a structured evaluation path, a transparent pricing methodology, and a trust center that matches your diligence depth. The ultimAItech experience is designed around qualified buyers who need defensible decisions rather than rushed commitments. Long-term value is prioritized over short-term wins.',
    'The blog and case studies offer complementary perspectives on how implementation choices show up in production. Reading them together with service pages can help you translate marketing language into concrete questions for your architecture review and stakeholder sign-off. When you are ready, start a qualified inquiry or strategy call with the intent that matches your stage.',
  ]),
  '/services': buildSection('ultimAItech — services overview', [
    'The services overview explains how ultimAItech packages web development, VYBR!S AI chatbot deployment, and AI infrastructure support for buyers who need clarity before committing. Each line is described with scope expectations, ideal customer profiles, and direct links into the detailed service pages. The intent is to help marketing leaders, operators, and technical stakeholders compare delivery models without ambiguous vendor language.',
    'Web development services focus on conversion-focused websites and applications: sharper buyer journeys, stronger technical foundations, and a cleaner path from traffic to qualified pipeline. Outcomes include performance and accessibility work, SEO-oriented structure, and implementation patterns that remain maintainable as teams iterate after launch.',
    'VYBR!S chatbot services emphasize brand-aligned assistants trained on customer content, with deployment, evaluation, and rollout planning built into the engagement. Teams can request guided demos, review security and hosting options, or pursue self-hosted evaluation when internal requirements demand it.',
    'AI infrastructure services address GPU planning, deployment architecture, orchestration, monitoring, and operational handoff for organizations scaling AI systems. Engagements may include physical server strategy, containerized deployments, and consulting on model operations so cost, reliability, and ownership boundaries are understood early.',
    'Delivery is scoped before build, milestone-based during implementation, and documented at handoff so internal teams can operate what ships. If you need pricing guidance or a strategy call to choose between service paths, the contact flow routes those intents separately from generic inquiries.',
    'Cross-functional teams should align on what “done” means for each milestone: acceptance criteria, performance thresholds, and documentation deliverables. ultimAItech documents those outcomes so product, marketing, and engineering stakeholders share the same definition of success. That alignment reduces rework when priorities shift mid-quarter.',
    'Commercially, buyers benefit when scope variables are explicit: content readiness, integration touchpoints, hosting responsibilities, and support windows. The services overview connects to deeper pages so you can drill into assumptions before you commit. If your organization needs phased funding, milestones can often be structured to match budget releases.',
    'Technically, teams should validate non-functional requirements early: rate limits, caching behavior, backup cadence, and monitoring ownership. Chatbot and AI infrastructure engagements add model lifecycle questions that web-only projects may not surface. Addressing those topics in discovery prevents late-stage surprises during security review.',
    'Operationally, training and handoff are part of delivery rather than optional extras. Documentation should match the sophistication of the system being launched, including runbooks for on-call rotations when applicable. If internal teams will own day-two operations, the engagement should explicitly cover knowledge transfer and escalation paths.',
    'Strategically, the right service mix depends on whether you are fixing a conversion problem, launching a new assistant channel, or scaling AI workloads. The overview page is intentionally comparative so you can see how engagements differ in timeline, risk profile, and stakeholder involvement before you choose a contact intent.',
    'When you are ready to compare vendors side by side, bring a checklist: discovery depth, documentation quality, support boundaries, and how change requests are priced. ultimAItech prefers those topics to be explicit because they predict delivery satisfaction more reliably than slide decks alone.',
    'Finally, remember that services are not purchased in isolation: marketing campaigns, analytics, and post-launch operations all influence outcomes. ultimAItech can help you connect service choices to those adjacent plans so budgets and timelines stay coherent across teams.',
  ]),
  '/case-studies': buildSection('ultimAItech — case studies and proof', [
    'The case studies area explains how ultimAItech presents proof: relevant, specific, and publicly verifiable work rather than fabricated customer claims. Featured examples include live sites that demonstrate booking flows, content structure, and cross-sell patterns that can be inspected directly in the browser. The goal is to give buyers confidence that public statements can survive procurement and technical review.',
    'When a case study is published, the scope visible on the live property matters: navigation, forms, product categories, and location pages should align with what the engagement actually delivered. This discipline keeps marketing narratives aligned to engineering reality and reduces mismatch risk during reference checks.',
    'If your buying process requires proof discussions, reference alignment, or a walkthrough of delivery metrics, the contact flow includes paths for proof requests and scoped conversations. The page also connects to services so teams can translate proof into the delivery model that fits their next initiative.',
    'Proof should not depend on undisclosed customer names when public artifacts already demonstrate quality. Where confidentiality limits detail, the site still documents methodology, milestones, and evaluation paths so buyers understand how success is measured without relying on unverifiable testimonials.',
    'For teams comparing vendors, the case study format highlights operational outcomes: performance, accessibility, structured content, and integration boundaries. Readers evaluating a similar engagement can map those attributes to their own constraints and determine whether the delivery approach fits internal security, hosting, and support requirements.',
    'Reference conversations work best when both sides agree on what can be verified publicly versus what remains confidential. ultimAItech emphasizes artifacts you can inspect directly—live pages, flows, and structured content—so diligence teams can validate claims without relying on private anecdotes.',
    'When a case study includes booking or commerce flows, reviewers should trace the full customer path: entry points, error handling, and post-submit confirmation. Those details reveal engineering maturity beyond visual design. Similar rigor applies to chatbot deployments where conversation quality depends on content governance and escalation rules.',
    'If your organization needs industry-specific compliance narratives, combine case studies with Trust Center documentation and privacy terms. Together they establish how data is handled, who operates infrastructure, and what review artifacts exist. Procurement teams can then map vendor responses to internal policy checklists.',
    'For growth-stage companies, case studies also illustrate how iterative releases balance speed with risk: what shipped first, what waited for a later milestone, and how metrics informed prioritization. That transparency helps executives judge whether a vendor’s pace matches their market window.',
    'Finally, proof is not only about past success—it is about repeatable methodology. ultimAItech documents evaluation paths and milestone patterns so future engagements can follow a predictable structure. Buyers should ask how lessons from prior deployments inform estimates and risk registers for new work.',
    'If you need a narrative for an internal investment committee, combine case study evidence with services detail and a phased rollout plan. Executives often approve budgets when risk, ROI, and operational impact are framed with concrete milestones rather than abstract promises.',
    'Case studies are also useful for onboarding new vendors: they show what “good” looks like in production, not only in design mockups. Use them as a baseline when you write acceptance tests and success criteria for your own engagement.',
  ]),
  '/security': buildSection('ultimAItech — Trust Center, security, and deployment', [
    'The Trust Center consolidates security practices, deployment flexibility, privacy references, and review expectations for enterprise buyers. Security is treated as part of discovery, architecture, implementation, and handoff rather than as a late add-on. Hosting models may include managed cloud, self-hosted, or hybrid approaches depending on data sensitivity and network boundaries.',
    'Deployment discussions cover TLS expectations, secret handling, environment separation, dependency review, and operational visibility for production systems. Buyers can start structured reviews through the security contact path when questionnaires, architecture walkthroughs, or data-handling clarifications are required.',
    'Data handling sections explain how customer content is used during website and chatbot engagements, how inquiry data is processed, and how operational telemetry may appear in support scenarios. Privacy policy and website terms complement this page for legal and procurement reviewers who need a complete baseline.',
    'Business continuity, backup priorities, and recovery expectations should be defined during rollout planning because the right model depends on whether ultimAItech operates the environment, the customer hosts it, or responsibilities are split. Access management and incident response expectations are described at a high level so stakeholders know where deeper documentation will appear in an active engagement.',
    'Unsupported certification claims are avoided in favor of accurate descriptions buyers can validate. If your organization requires self-hosting or controlled environments for AI or chatbot workloads, those constraints should be raised early so architecture and deployment paths can be designed accordingly.',
    'Network segmentation questions often arise when assistants connect to internal knowledge bases or when models run near sensitive systems. The Trust Center encourages buyers to describe required boundaries up front so firewall rules, VPN requirements, and administrative access models can be planned collaboratively rather than debated after code freeze.',
    'Logging and monitoring expectations should match the sensitivity of the workload. For some teams, verbose logs accelerate troubleshooting; for others, log minimization is a policy requirement. ultimAItech discusses telemetry footprint during discovery so monitoring does not accidentally capture prohibited data categories.',
    'Patching and dependency management are part of secure delivery. Buyers should understand how updates are tested, how rollbacks work, and who approves production changes. These operational details matter as much as encryption settings when you evaluate long-term operational risk.',
    'Vendor access for support scenarios should be time-bound and documented. The Trust Center framing assumes least privilege: access exists for a reason, expires when work completes, and is reviewed periodically. If your procurement policy requires named individuals or break-glass procedures, those can be incorporated into engagement planning.',
    'If you need a formal review package, combine this page with privacy policy, terms, and contact paths for security review. That bundle gives reviewers a coherent story: how the public site behaves, how inquiries are handled, and how project-specific security is escalated when an engagement begins.',
    'For organizations with zero-trust initiatives, map Trust Center statements to your control framework: identity, devices, networks, applications, and data. ultimAItech can participate in workshops that translate technical controls into questionnaire answers your assessors expect.',
    'Third-party security assessments sometimes require evidence of patch cadence, dependency scanning, and vulnerability response times. While public pages cannot list every internal process, buyers can request additional detail through the security review path when a live opportunity is active.',
  ]),
  '/blog': buildSection('ultimAItech — blog', [
    'The ultimAItech blog publishes articles and practical notes on AI systems, modern web development, chatbot rollout, and infrastructure topics. Posts are intended for technical and business readers who want implementation-aware context rather than generic thought leadership. Subjects may include deployment lessons, evaluation criteria, performance work, and buyer guidance that supports procurement conversations.',
    'Readers evaluating VYBR!S can use blog content alongside the demo and use-case pages to understand how assistants are trained, deployed, and governed in real environments. Web development articles may cover conversion strategy, accessibility, SEO architecture, and maintainability tradeoffs that affect long-term cost.',
    'Infrastructure articles focus on production readiness: monitoring, orchestration, GPU planning, and operational responsibilities across staging and production. When posts reference product behavior, they aim to stay aligned with publicly documented capabilities so marketing language does not outpace what implementations can support.',
    'The blog index highlights featured posts and maintains a consistent excerpt format so visitors can scan topics quickly. If the database is temporarily unavailable, static navigation still points readers to services, demos, and contact paths so evaluation can continue.',
    'Subscribe or revisit periodically if you want deeper dives that complement the shorter summaries on service pages. For specific questions tied to an opportunity, a qualified inquiry or strategy call remains the best path when you need answers scoped to your environment and timeline.',
    'Editorial standards aim for clarity over buzzwords: posts should help a practitioner decide what to validate next, not merely describe trends. When a topic touches product behavior, writers cross-check claims against public documentation so readers can reconcile marketing pages with engineering reality.',
    'Series-style posts may explore one theme across multiple articles—deployment, measurement, governance—so readers can build a curriculum over time. If you are onboarding new team members, the blog can accelerate shared vocabulary before you enter procurement or architecture workshops.',
    'Performance and cost tradeoffs appear frequently because they affect real roadmaps. Articles may discuss caching, model selection, batching, or infrastructure sizing with enough context to be actionable while avoiding customer-specific secrets. The goal is transferable lessons, not unattributed anecdotes.',
    'Accessibility and inclusive design occasionally appear because they affect conversion and compliance simultaneously. Teams sometimes underestimate how small UX defects compound across campaigns; the blog reinforces that accessibility is part of quality, not a separate line item tacked on at the end.',
    'If an article references a workflow that depends on your internal tools, treat it as a template rather than a guarantee. ultimAItech encourages readers to map recommendations to their own change-management process, release cadence, and risk appetite. When you need a tailored plan, move from reading to a scoped conversation.',
    'Long-form guides may include checklists you can paste into internal docs; short posts may focus on a single decision point. Either way, cite the publication date when you circulate content internally because recommendations can evolve as products and regulations change.',
    'RSS or syndication features may change over time; the canonical source for blog content remains ultimAItech.com. If you republish excerpts, link back to the original article and avoid altering technical guidance in ways that could mislead readers.',
  ]),
  '/about': buildSection('ultimAItech — about', [
    'ultimAItech positions itself as a practical partner for AI and web delivery: scoping work around business goals, buyer journeys, and operational requirements before implementation detail takes over. The team focuses on deployments organizations can operate, evaluate, and support rather than speculative features without clear ownership.',
    'Trust is built through defensible claims, documented methodologies, and accessible trust-center materials. Public proof avoids inflated customer narratives; instead, verifiable work and structured qualification paths demonstrate capability. This approach is designed to hold up in enterprise procurement and security review.',
    'Service delivery spans conversion-focused web experiences, VYBR!S chatbot rollouts, and AI infrastructure programs. Each area includes discovery, milestone delivery, documentation, and handoff patterns so commercial, technical, and operational stakeholders stay aligned.',
    'Ideal customers include enterprise teams in complex environments, growth-stage companies building a stronger digital foundation, and technical leaders who need accountable implementation partners. The engagement model emphasizes clarity before complexity: fewer surprises at contract time and fewer mismatched expectations after launch.',
    'If you want to understand fit before a detailed scope, the about narrative connects to services, use cases, demos, and contact intents so you can choose an entry point that matches your buying stage rather than defaulting to a generic form.',
    'Culture and values matter in delivery partnerships: accountability, transparency, and disciplined communication reduce thrash when requirements evolve. ultimAItech emphasizes written scope, milestone checkpoints, and explicit ownership so executives can see progress without being pulled into daily standups unnecessarily.',
    'Geography and time zones can influence collaboration models. Remote-first workflows are supported with clear documentation and asynchronous updates, while workshops and reviews can be scheduled when synchronous alignment is needed. The goal is predictable progress without unnecessary meeting load.',
    'Partnership extends beyond launch: many organizations need iteration, experimentation, and infrastructure tuning after first release. The firm’s model anticipates ongoing engagement options where appropriate, rather than treating launch as a hard handoff without continuity plans.',
    'Stakeholder alignment across marketing, product, IT, and security is often the hardest part of digital initiatives. The about page frames ultimAItech as a facilitator who helps those groups converge on a shared plan with measurable outcomes.',
    'If you are evaluating multiple vendors, compare how each handles discovery, change requests, and support boundaries. ultimAItech prefers clarity upfront because it protects both sides: customers know what to expect, and delivery teams can plan capacity without constant scope churn.',
    'Sustainability of delivery also depends on knowledge transfer: documentation, workshops, and paired working sessions help your team absorb ownership. ultimAItech structures handoffs so you are not permanently dependent on a vendor for routine changes that should be internal skills.',
    'Industry focus varies by engagement: regulated environments, high-growth startups, and established enterprises each bring different constraints. ultimAItech adapts communication style and documentation depth to match the buyer’s maturity without slowing down teams that need fast decisions.',
    'Community and ecosystem participation matters indirectly: integrations, partner marketplaces, and API ecosystems can expand what a delivery team can accomplish without building everything in-house. ultimAItech stays pragmatic about where to integrate versus where to build custom, always tying decisions to measurable outcomes.',
  ]),
  '/contact': buildSection('ultimAItech — contact and qualified inquiries', [
    'The contact experience is organized around qualified inquiries and strategy calls rather than a single undifferentiated form. Visitors can choose intent such as pricing guidance, VYBR!S demo requests, security or trust reviews, project scoping, infrastructure consultation, proof discussions, or general inquiries. Service selection and timeline fields help route the request without losing commercial context.',
    'Strategy calls fit early-stage qualification when you need scope definition, architecture direction, or a realistic launch plan. Pricing guidance fits teams that already know the service area and want commercial direction tied to scope. Demo requests route to chatbot evaluation when stakeholders need to see product behavior and deployment assumptions.',
    'Security and privacy reviews can be initiated when procurement requires questionnaires, data-handling detail, or architecture walkthroughs. Proof and reference discussions are supported when buyers need to align public materials with internal diligence requirements.',
    'Submissions generate email to the operations team with structured fields so responses can be scoped consistently. Meeting window and budget fields are optional but help prioritize follow-up when capacity is constrained. Expect a professional reply aligned to the intent you selected rather than an automated marketing sequence.',
    'If you are unsure which path to use, start with services or use cases, then return to contact with a clearer intent. The site also links to the Trust Center for security documentation and to the demo page for evaluation options specific to VYBR!S.',
    'Response quality improves when you include constraints: deadlines, budget bands, compliance context, and whether internal engineering capacity exists. Those details help prioritize requests and avoid generic replies that do not advance your decision.',
    'If you represent procurement or legal, mention review timelines and required document formats early. ultimAItech can often adapt to questionnaire templates or security packets when the scope of questions is understood. Ambiguous review cycles can delay alignment, so dates matter.',
    'For international organizations, include relevant data residency or contracting entity requirements when they affect how services are delivered. While not every question belongs in the first message, the highest-impact constraints should be surfaced early.',
    'Follow-up should feel collaborative, not transactional. Expect clarifying questions that refine scope rather than immediate quotes without context. If a request is not a fit, you should hear that clearly so you can redirect effort internally.',
    'If you need a call, propose a few windows and time zones; the team will confirm or suggest alternatives. Clear scheduling reduces back-and-forth and helps both sides prepare materials. If you prefer a written summary first, note that preference in the message.',
    'Attachments and links help: architecture diagrams, analytics screenshots, or example competitor experiences reduce ambiguity. Even rough materials accelerate alignment compared to abstract descriptions alone. Mark any confidential items clearly so handling expectations are understood.',
    'If you are comparing multiple vendors, it is acceptable to request a written summary of assumptions after a discovery call. Summaries reduce confusion when internal stakeholders join late and ensure everyone is aligned on scope before proposals are written.',
    'Escalation paths for urgent issues should be clarified for active engagements: who is on call, how severity is classified, and what communication channels are used. Clear escalation reduces downtime during incidents and prevents misrouted requests during high-stress periods.',
  ]),
  '/web-development': buildSection('ultimAItech — web development services', [
    'Web development services focus on conversion-focused websites and web applications for teams that need stronger buyer journeys, clearer messaging, and technical foundations that survive iteration. Work spans discovery, UX and content structure, implementation, performance optimization, and launch support with documented milestones throughout.',
    'Capabilities include custom builds, performance remediation, and modern framework adoption using practices that emphasize accessibility and SEO-friendly architecture. Engagements may involve CMS integration, headless approaches, or application workflows depending on publishing and operational needs.',
    'Sample engagements include relaunches for repositioning, performance improvements for weak Core Web Vitals, and content systems that balance editorial flexibility with speed. Each project should define success metrics that map to pipeline, operational cost, or reliability outcomes rather than subjective aesthetics alone.',
    'The process typically moves from discovery through design and development to deployment with CI/CD, monitoring hooks, and documentation so internal teams can operate the result. Long-term maintainability is treated as a requirement, not an afterthought, because turnover and vendor changes happen.',
    'If you need pricing context or a strategy conversation before committing, use the contact paths designed for those stages. Related pages include services, use cases, and case studies for additional proof points.',
    'Content modeling and information architecture matter as much as visual design. ultimAItech helps teams map page types, templates, and governance rules so new content does not degrade performance or SEO structure over time. A strong IA reduces friction for marketing teams after launch.',
    'Analytics and experimentation should be integrated thoughtfully: event naming, consent banners, and server-side versus client-side tracking choices affect both compliance and insight quality. Discovery should capture how you measure success so implementation can be instrumented correctly.',
    'Front-end performance is not just about Lighthouse scores: it is about how quickly buyers can complete tasks. The team prioritizes real user journeys and business-critical flows when optimizing. That focus prevents “vanity” optimizations that do not improve pipeline outcomes.',
    'When integrating third-party systems—CRMs, booking engines, payment providers—early technical validation is essential. ultimAItech maps assumptions about APIs, webhooks, and error handling so integrations do not become brittle surprises near launch.',
    'Accessibility remediation is most cost-effective when planned early. Retrofitting components after launch can be expensive and disruptive. Web development engagements treat WCAG-oriented patterns as part of the default build rather than an optional audit at the end.',
    'Design QA and content QA should run in parallel with engineering QA: broken copy, inconsistent terminology, or misleading CTAs undermine even performant builds. ultimAItech encourages shared review checkpoints so issues are caught before public launch traffic arrives.',
    'Mobile and desktop parity should be validated early: responsive breakpoints, touch targets, and keyboard navigation affect conversion and compliance. Performance budgets should be tested on representative devices, not only developer laptops.',
    'Search and navigation patterns should be tested with real tasks: finding a product, booking a service, or downloading a resource. Task-based testing reveals friction that component-level testing misses, especially when content is dense or multilingual.',
    'Release management should include rollback plans: feature flags, database migrations, and cache invalidation strategies are part of safe delivery. ultimAItech documents release steps so operators know how to revert when unexpected issues appear in production.',
  ]),
  '/chatbots': buildSection('ultimAItech — AI chatbot services and VYBR!S', [
    'VYBR!S AI chatbot services provide brand-aligned assistants trained on customer content with deployment, governance, and evaluation paths. Teams can pursue guided demos, technical self-hosted review, or scoped rollout discussions depending on security and procurement constraints. The platform supports website-trained responses with controls intended to reduce off-brand answers.',
    'Common deployment scenarios include lead qualification, support deflection, and knowledge retrieval across documented material. Implementation planning covers embedding, widget configuration, content ingestion, and operational ownership so the assistant’s behavior matches internal policies.',
    'Evaluation options include live walkthroughs for commercial and technical stakeholders, installer-based review for engineering teams, and pricing discussions when the use case is already understood. Security topics such as data residency, hosting, and access control should be raised during discovery rather than after rollout.',
    'Technical documentation in marketing materials stays aligned to the product’s public capabilities: scraping, embedding storage, model usage, and widget integration are described at a level useful to architects without exposing secrets. If your environment requires private networking or self-hosting, those paths can be explored during qualified conversations.',
    'For buyers comparing chatbot vendors, the combination of clear evaluation paths and infrastructure flexibility is designed to reduce surprises during procurement. Connect services, demos, and use cases if you need a broader comparison across web and AI infrastructure investments.',
    'Conversation design and guardrails deserve explicit attention: tone, escalation rules, and fallback behaviors should match brand standards. ultimAItech encourages teams to define what the assistant should never do, not only what it should do. That reduces reputational risk when edge cases appear.',
    'Training data hygiene matters: outdated content, conflicting pages, or unpublished drafts can confuse retrieval. The engagement should include a plan for content refresh cadence and ownership so answers stay accurate as product lines evolve.',
    'Multilingual support, if required, should be validated early. Translation workflows and locale-specific policies affect how answers are generated and reviewed. Waiting until late in rollout to discover language gaps can delay launches.',
    'Measurement for chatbots includes deflection rate, quality sampling, and human handoff success. ultimAItech helps teams define metrics that align with support and revenue goals rather than vanity conversation counts. Good dashboards make iteration possible.',
    'If the assistant will access semi-structured knowledge, consider how documents are versioned and how approvals are recorded. Governance processes reduce the risk of the assistant citing outdated internal policies. Security and legal teams should sign off on access patterns.',
    'Pilot programs should define success thresholds and duration up front so teams can decide whether to expand, iterate, or stop. Without thresholds, pilots drift and budgets erode. ultimAItech supports structured pilots with clear exit criteria tied to business metrics.',
    'Human escalation paths should be defined before launch: which agents receive handoffs, what SLAs apply, and how context is transferred so customers do not repeat themselves. The assistant should reduce friction, not create new silos between support and sales.',
    'Widget branding and accessibility should be validated: color contrast, focus order, and screen reader labels matter for inclusive customer experiences. ultimAItech reviews these details so the assistant feels native to your site rather than bolted on.',
  ]),
  '/ai-infrastructure': buildSection('ultimAItech — AI infrastructure services', [
    'AI infrastructure services help teams plan and run production AI systems with attention to cost, reliability, and operational ownership. Offerings include physical AI server strategy, consulting on model and architecture choices, and scalable deployment patterns using containers and orchestration where appropriate.',
    'Deployment models may include on-premise or co-located GPU environments, cloud-based services, or hybrid designs that keep sensitive workloads inside customer-controlled networks. The right model depends on data sensitivity, latency requirements, staffing, and procurement rules that should be captured early.',
    'Consulting engagements may cover readiness reviews, architecture recommendations, risk identification, implementation planning, and handoff documentation so internal teams can operate models and pipelines confidently. Monitoring, alerting, and CI/CD for ML workflows are treated as production requirements.',
    'Scaling discussions include autoscaling behavior, capacity planning, and failure modes so operators know what “healthy” looks like after launch. Security-first patterns such as least-privilege access and environment separation are emphasized because AI systems amplify operational impact when misconfigured.',
    'If you need a strategy call to align stakeholders or a deeper architecture review before investment, use the contact paths that match infrastructure intent. Related material appears on services, use cases, and security pages depending on whether your questions are commercial, technical, or compliance-oriented.',
    'Cost modeling is a joint exercise: GPU hours, storage growth, network egress, and support staffing all scale differently. ultimAItech helps teams build scenarios for steady-state and peak load so finance can compare forecasts against budgets.',
    'Orchestration choices affect how quickly you can redeploy models, roll back bad releases, and isolate failures. Kubernetes may be appropriate for some teams, while simpler patterns may be appropriate for others. The right answer depends on operational maturity and staffing.',
    'Observability stacks should cover inference latency, queue depth, error rates, and resource saturation. Without baseline metrics, teams cannot distinguish model issues from infrastructure issues during incidents. Planning observability early reduces mean time to recovery.',
    'Data pipelines feeding models need validation, monitoring, and drift detection where applicable. The infrastructure program can include guidance on how to test pipelines independently from model changes so failures are easier to isolate.',
    'Disaster recovery and backup strategies vary by deployment model. Cloud-managed services may offer different defaults than self-hosted stacks. ultimAItech documents assumptions so recovery point objectives and recovery time objectives can be discussed with stakeholders explicitly.',
    'FinOps alignment is increasingly important: finance should understand variable spend drivers for GPU workloads and how autoscaling affects monthly bills. ultimAItech can help translate technical metrics into financial dashboards executives recognize.',
    'Capacity planning should include seasonal spikes and marketing campaigns that can change traffic patterns abruptly. Load testing and chaos engineering exercises may be appropriate depending on risk tolerance and customer impact.',
    'Identity and access management integrations can affect how models and services authenticate to internal systems. ultimAItech reviews authentication flows early so token lifetimes, rotation, and least-privilege roles are consistent with security expectations.',
    'Model lifecycle management includes retraining, evaluation, and rollback when new versions regress quality. Infrastructure must support canary deployments and traffic splitting so updates can be validated before full rollout.',
  ]),
  '/use-cases': buildSection('ultimAItech — use cases', [
    'Use cases are grouped by outcome so buyers can start from the problem they are solving instead of guessing which service line fits first. Website scenarios include repositioning offers, rebuilding high-traffic properties for performance and governance, and improving paths from marketing pages into demos and qualified contact flows.',
    'VYBR!S scenarios include lead qualification for high-intent visitors, support deflection for repetitive questions, and internal knowledge access when teams need faster retrieval across approved documents. Each scenario maps to deployment and governance considerations that should be validated during discovery.',
    'AI infrastructure scenarios include planning reliable services with clear support expectations, reviewing deployment options before proof-of-concept becomes production, and scoping GPU environments with operational stakeholders. These scenarios help align technical choices with business risk tolerance.',
    'Enterprise buyers often know the outcome before they know the vendor category, so the library format reduces friction when navigating services, demos, and contact intents. If you recognize your situation, the next step is usually a scoped conversation rather than another round of generic research.',
    'For teams that need cross-cutting guidance, combine use cases with the services overview and Trust Center documentation so security, delivery, and commercial questions are addressed together.',
    'Use cases are not exhaustive; they are representative patterns that match how buyers often describe problems. If your situation blends multiple patterns, combine contact intents or request a strategy call so the overlap can be mapped to a delivery plan.',
    'Regulated industries may require additional controls on logging, data retention, and model behavior. When you see a use case that resembles a regulated workflow, plan to bring compliance stakeholders into discovery early.',
    'Seasonal traffic spikes or campaign launches can affect both web and infrastructure needs. Use cases that mention performance or reliability should be paired with expected traffic assumptions so sizing and caching strategies are realistic.',
    'Internal tools and employee-facing assistants differ from public chatbots in governance and access control. If your scenario is internal, highlight identity providers, SSO expectations, and document permissions when you start a conversation.',
    'International expansion introduces localization, currency, and legal nuances. Use cases focused on web delivery should include target markets so SEO and content architecture can be evaluated holistically rather than as an afterthought.',
    'Cross-functional workshops can validate whether a use case is primarily revenue, cost reduction, or risk mitigation; the answer changes KPIs and success measures. ultimAItech recommends documenting that decision before selecting vendors or architectures.',
    'Use cases that span multiple departments should identify a single accountable owner for decisions. Without ownership, pilots stall. ultimAItech can facilitate workshops, but internal sponsorship is required to drive approvals and funding.',
    'Use cases tied to legacy modernization should include migration risk: data cleanup, URL continuity, and redirect strategy. ultimAItech helps teams sequence migrations so SEO and customer bookmarks are preserved while technical debt is reduced.',
    'Use cases involving customer data should identify lawful bases for processing, retention limits, and deletion workflows where applicable. ultimAItech encourages legal and security teams to align on these points before automation increases scale.',
    'Industry benchmarks can inform prioritization, but your internal constraints should drive sequencing: compliance deadlines, contract renewals, and executive mandates all affect what to tackle first.',
  ]),
  '/demo': buildSection('ultimAItech — VYBR!S demo and evaluation paths', [
    'The demo page explains evaluation paths and rollout guidance for VYBR!S: guided demos for stakeholders who want walkthroughs, self-hosted technical review for engineering-led diligence, and pricing or rollout discussions when the use case is already defined. Each path matches a different stage of the buying process.',
    'Review topics include content ingestion, deployment fit, buyer-journey placement, and security questions that should be resolved before implementation. The page also shows the embed model so teams understand how the widget is added to existing sites with configurable appearance and behavior.',
    'Rollout guidance emphasizes realistic sequencing: qualify fit, confirm hosting constraints, align internal owners, then plan production cutover with monitoring and support expectations. Skipping those steps often creates avoidable friction after launch.',
    'If you need a live conversation, request a guided demo through the contact flow with chatbot intent selected. If you need commercial framing, combine demo interest with pricing guidance so responses can reference scope variables accurately.',
    'Evaluation should answer whether the assistant meets accuracy, governance, and operational requirements for your environment. The site links to chatbot services and use cases for complementary detail.',
    'Demos are most productive when participants agree on success criteria beforehand: which questions must be answered well, which integrations must be shown, and what failure modes are acceptable during a pilot. Without criteria, demos become feature tours rather than decisions.',
    'Self-hosted evaluation paths exist for teams that need to test inside network boundaries. Plan for machine access, time-boxed trials, and support channels during the trial so engineers are not blocked by environment issues.',
    'Rollout guidance includes change management: internal communications, training for support agents, and customer-facing messaging when a widget goes live. Skipping change management can create confusion even if the technology works.',
    'Security and privacy questions should be captured during evaluation, not deferred. If your team needs a data processing agreement or custom terms, note that early so legal review can run in parallel with technical evaluation.',
    'After a demo, compare notes across stakeholders: marketing, support, IT, and compliance may weight different risks. ultimAItech encourages a consolidated decision memo so the next step—pilot, pricing, or architecture review—is explicit.',
    'Recording demos internally can help absent stakeholders catch up, but clarify recording policies and data handling before you store sensitive conversations. If transcripts include customer data, treat them as confidential and align retention to policy.',
    'If you need procurement references, combine demo outcomes with security and deployment documentation so the full story is available to approvers. Demos alone rarely satisfy enterprise governance; they work best as part of a structured diligence package.',
    'Pilot success criteria should include qualitative and quantitative measures: user satisfaction, conversation resolution rates, and escalation volume. ultimAItech recommends documenting baseline metrics before pilot start so improvements are measurable rather than anecdotal.',
    'Competitive evaluations should compare total cost of ownership: licensing, hosting, support, and internal labor to operate and maintain the assistant over time. A lower license price may not win if operational overhead is higher.',
    'Stakeholder sign-off should include a written summary of assumptions, risks, and next steps so the evaluation does not lose momentum when teams return to day-to-day work.',
  ]),
  '/privacy': buildSection('ultimAItech — privacy policy overview', [
    'This overview summarizes how information is handled when you visit ultimAItech.com, submit an inquiry, or interact with the public website. It is meant to give buyers and visitors a practical baseline before project-specific agreements or data-processing arrangements are negotiated. If a project proceeds beyond an inquiry, additional terms may apply through separate commercial documentation.',
    'Information you provide directly may include name, email, company, role, website, service interest, timeline, budget context, and message content. Operational and technical information can include browser details, device type, approximate location derived from IP, referral data, and diagnostic information typical for secure website delivery.',
    'Communications and follow-up records may be retained so inquiries can be answered consistently, scoped accurately, and revisited when buying processes continue over time. Uses include responding to demos and pricing requests, evaluating fit, securing the site, improving workflows, maintaining business records, and meeting legal obligations.',
    'Third-party providers may assist with hosting, form delivery, email, analytics, and infrastructure. Disclosures may also occur when legally required or to protect rights, property, and users. Inquiry information is intended for business communication rather than consumer data sales.',
    'Retention depends on the need to respond, maintain records, support ongoing discussions, and satisfy legal or operational requirements. Security measures are applied with reasonable safeguards, though no internet transmission is perfectly risk-free. International hosting or providers may apply; raise residency requirements early. You may request access, updates, or deletion where applicable by contacting info at ultimaitech.com with enough detail to identify the request.',
    'Cookies and analytics may be used for basic usage insight. For deeper questions, use Trust Center review paths so technical and legal topics can be handled together.',
    'Children’s services are not targeted by the public site; inquiry flows are intended for business contexts. If you believe information was submitted in error, contact using published channels so records can be reviewed under applicable policies.',
    'Automated decision-making is not marketed as a core feature of inquiry handling; human review is part of normal business development. If your jurisdiction requires specific disclosures about profiling, raise them during procurement so documentation can be aligned.',
    'Cross-border transfers may occur when providers operate globally. Customers with strict residency requirements should document constraints and review subprocessors as part of diligence. ultimAItech aims to surface deployment options that reduce unnecessary data movement.',
    'Breach notification expectations depend on jurisdiction and contract terms. This public overview cannot replace engagement-specific security commitments. For active projects, incident response and notification timelines should be defined in writing.',
    'Marketing communications, if any, should include opt-out mechanisms where required. Business inquiries are not treated as blanket consent for unrelated marketing. If you want to limit follow-up, state that clearly in your message.',
    'Updates to this overview may be posted periodically. Material changes should be reviewed alongside terms and privacy policy updates. Procurement teams should capture versions when they rely on public statements for vendor assessments.',
    'If you have questions about how this overview applies to a specific inquiry or engagement, include identifiers and dates when you contact the team so records can be located efficiently.',
  ]),
  '/terms': buildSection('ultimAItech — website terms', [
    'By accessing ultimAItech.com, you agree to use the site lawfully and without interfering with its operation, security, or availability. Content is provided for general information. Public descriptions of services, trust materials, and pricing methodology do not create binding commercial obligations by themselves; formal engagements require separate written agreements.',
    'Project and service discussions may proceed through proposals, statements of work, or other contracts that define scope, timing, fees, and support expectations. Website content should not be read as a substitute for those documents when commitments matter to your organization.',
    'Third-party links and tools may appear for convenience. ultimAItech is not responsible for external sites or services it does not control. You should review third-party terms and privacy policies when you leave the public site or integrate external systems.',
    'Intellectual property rights in site content remain with ultimAItech or licensors. Unless expressly permitted, copying, redistribution, or modification of materials beyond fair use or contractual license is not allowed. Trademarks and branding should not imply endorsement without written consent.',
    'Disclaimers: information may change, and the site may be unavailable during maintenance. To the extent permitted by law, ultimAItech disclaims warranties implied by usage of informational content and limits liability for indirect or consequential damages arising from site use except where prohibited.',
    'If disputes arise, governing law and venue terms may be specified in separate agreements; for general site usage questions, contact through published inquiry paths. Updates to these terms may be posted here with a revised effective date when material changes occur.',
    'Using the contact forms constitutes agreement that communications relate to legitimate business evaluation and service qualification. Automated abuse, scraping that impairs operations, or attempts to circumvent security controls are prohibited and may lead to access restrictions or legal action where appropriate.',
    'You may not use the site to distribute malware, conduct phishing, or attempt unauthorized access to systems or accounts. Respect for rate limits and operational stability is required. If you discover a vulnerability, report it responsibly through published contact channels.',
    'Feedback and suggestions are welcome, but unsolicited ideas submitted through the site may be used without obligation to compensate the submitter unless a separate agreement exists. If you need confidentiality for an idea, negotiate that before sharing details.',
    'The site may be updated, features may change, and content may be removed when outdated. Continued use after updates constitutes acceptance of reasonable changes. If material changes affect your rights, additional notice mechanisms may be used where appropriate.',
    'Severability: if any provision is held invalid, remaining provisions continue to the fullest extent permitted. No waiver of a breach should be construed as a waiver of future breaches. Headings are for convenience only.',
    'Entire agreement for site usage is represented by these terms together with referenced policies. Conflicting oral statements do not override written terms. For project-specific engagements, separate contracts control.',
    'Contact information on the site should be used for legitimate business purposes. Misrepresentation, impersonation, or fraudulent inquiries are prohibited. ultimAItech may preserve records to enforce these terms and protect legitimate users.',
  ]),
};

async function getBlogPostBodyHtml(slug) {
  let rows;
  try {
    const result = await query(
      `SELECT title, excerpt, content
       FROM blog_posts
       WHERE slug = $1
         AND status = 'published'
         AND published_at IS NOT NULL
         AND published_at <= NOW()
       LIMIT 1`,
      [slug]
    );
    rows = result.rows;
  } catch {
    return null;
  }
  if (!rows.length) return null;

  const row = rows[0];
  const plain = markdownToPlain(row.content || '');
  let text = plain;
  if (wordCount(text) < 120 && row.excerpt) {
    text = `${row.excerpt}\n\n${text}`;
  }
  if (wordCount(text) < 500) {
    text = `${text}\n\n${BLOG_WORDCOUNT_SUPPLEMENT}`;
  }
  const paragraphs = splitIntoParagraphs(text, 2000);
  const title = `${row.title} — ultimAItech blog`;
  return buildSection(title, paragraphs);
}

async function getBodySectionHtml(pathname) {
  const normalized = pathname.replace(/\/$/, '') || '/';
  const blogMatch = normalized.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const postHtml = await getBlogPostBodyHtml(slug);
    if (postHtml) return postHtml;
    return BODIES['/blog'] || null;
  }
  return BODIES[normalized] || BODIES['/'];
}

async function injectBody(html, pathname) {
  const section = await getBodySectionHtml(pathname);
  if (!section) return html;
  return html.replace('<div id="root">', `${section}\n    <div id="root">`);
}

module.exports = {
  getBodySectionHtml,
  injectBody,
  buildSection,
  escapeHtmlText,
};
