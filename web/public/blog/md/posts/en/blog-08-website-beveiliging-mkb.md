---
title: "Website security: what every SMB should know in 2026"
slug: website-beveiliging-mkb-2026
description: "Think hackers only target large companies? 43% of cyberattacks focus on SMBs. Here's what you need to know to protect your website."
keywords: website security, secure website, SSL certificate, security headers, website hacked, website safety SMB, HTTPS website
author: ultimAItech
date: 2026-05-25
lang: en
---

# Website security: what every SMB should know in 2026

"My business is too small to get hacked." I hear that regularly. And it's wrong.

43% of all cyberattacks target small and medium-sized businesses. Not because they have valuable data, but because they're easy targets. No IT department, no security protocol, often outdated software.

You don't need to become a security expert. But you do need the basics in order. In this article, I explain what that means — without jargon.

## What's at stake?

If your website gets hacked, these are the possible consequences:

- **Google warns visitors** with "This site may be hacked" — your traffic drops to zero
- **Customer data leaks** — form submissions, email addresses, possibly payment data
- **Your site spreads malware** — visitors are redirected to harmful sites
- **Reputation damage** — building trust takes years, losing it takes seconds
- **GDPR fine** — if personal data leaks and you haven't taken adequate security measures

The average cost of a data breach for a small business is around €25,000 — that's not an American figure, it applies in the Netherlands too.

## The basics: 7 security measures

### 1. HTTPS (SSL certificate)

If your website still runs on `http://` instead of `https://`, this is your first priority.

HTTPS encrypts the connection between your visitor's browser and your server. Without HTTPS, anyone on the same WiFi network (think of a café) can read along — including form submissions.

**How to fix it:** Most hosting providers offer free SSL via Let's Encrypt. Enable it in your hosting panel. If someone charges you for this, look elsewhere.

**Status in 2026:** Google Chrome actively marks HTTP sites as "Not secure." This scares off visitors and costs you rankings.

### 2. Security headers

Security headers are instructions your server sends with every page. They tell the browser how to behave securely. Most websites lack them — and most web developers forget them.

The most important ones:

| Header | What it does |
|---|---|
| Strict-Transport-Security (HSTS) | Forces HTTPS. Prevents someone intercepting the first connection |
| X-Content-Type-Options | Prevents browsers from executing files as scripts |
| X-Frame-Options | Prevents your site being loaded in an iframe on another site |
| Referrer-Policy | Limits which URL information is shared with external sites |
| Permissions-Policy | Blocks access to camera, microphone, and GPS unless you explicitly allow it |
| Content-Security-Policy | Determines which sources (scripts, images) may load — the most powerful but also most complex |

**How to fix it:** These are four lines in your `.htaccess` file or Cloudflare configuration. Your web developer can set this up in five minutes.

### 3. Keep updates current

**WordPress sites:** WordPress, themes, and plugins receive regular security updates. Every update you postpone is an open door for attackers. Many hacks exploit vulnerabilities that have been patched for months — but not installed.

**Custom sites:** Less urgent updates, but regularly check whether your server software (Node.js, PHP, web server) is up to date.

Automatic updates are a double-edged sword: they keep you safe but can break things. A monthly manual check is a good compromise.

### 4. Strong passwords and 2FA

This sounds obvious, but it's still the #1 cause of hacked sites:

- Admin password is "welcome123" or the company name
- Same password for hosting, email, CMS, and social media
- No two-factor authentication (2FA)

**Minimum requirements:**
- Use a password manager (Bitwarden is free and good)
- Each account has a unique password of at least 16 characters
- Enable 2FA on everything: hosting, CMS, email, domain registrar

### 5. Backups

When things go wrong — hack, server error, accidentally deleted — you want to restore to a working version. Without a backup, you start from scratch.

**What you need:**
- Daily automatic backup of files and database
- Backups stored in a different location than your server
- Kept for at least 30 days
- Tested: can you actually restore a backup?

Most hosting providers offer automatic backups. Check whether this is active and whether it includes the database.

### 6. Limit access

Who has access to your website, hosting, and server?

- Remove accounts of former employees and previous web developers
- Grant only the permissions needed (not everyone needs admin)
- Use separate accounts per person — never a shared password

### 7. Monitoring

You want to know when something goes wrong — preferably before a customer reports it.

**What you can monitor:**
- Is the site online? (free tools: UptimeRobot, Freshping)
- Have unknown files been added?
- Are unusual amounts of data being sent?
- Has Google found problems? (Google Search Console)

A daily uptime check and weekly glance at Search Console take five minutes and can prevent major problems.

## How secure is your website now?

You can test your security headers for free at [securityheaders.com](https://securityheaders.com). The site gives a score from A+ to F.

Most SMB websites score D or F. Not because they were built insecurely, but because security headers are simply forgotten. The good news: it's quick to fix.

## GDPR and security

GDPR (General Data Protection Regulation) requires you to take "appropriate technical measures" to protect personal data.

If you have a contact form, store newsletter signups, or manage customer accounts, you process personal data. Then these requirements apply:

- HTTPS is mandatory when processing personal data
- You must have a data processing agreement with your hosting provider
- Your privacy policy must state which data you process and why
- In case of a data breach, you must report to the Dutch Data Protection Authority within 72 hours

This isn't a checklist to scare you — it's a checklist to protect your business.

## What does it cost?

| Measure | Cost | Time investment |
|---|---|---|
| SSL certificate | Free (Let's Encrypt) | 10 minutes |
| Set up security headers | Free | 30 minutes |
| Password manager | Free (Bitwarden) | 1 hour one-time |
| Enable 2FA | Free | 15 minutes per account |
| Automatic backups | €0–€10/month | 30 minutes one-time |
| Uptime monitoring | Free (UptimeRobot) | 15 minutes |
| Keep updates current | Free (your time) | 1 hour/month |

Total: less than €10/month and an afternoon of work. Compare that to €25,000 average damage from a data breach.

## Summary

- 43% of cyberattacks target SMBs — you're not too small
- HTTPS, security headers, and strong passwords are the basics
- Keeping updates current and making backups prevent most problems
- Monitoring takes five minutes per week and can prevent thousands in damage
- GDPR requires "appropriate technical measures" — this article describes them

---

*Want to know how secure your website is? At ultimAItech I scan your site for security gaps and fix headers and configuration. [Request a security check →](https://ultimaitech.com/contact/?intent=security-audit)*
