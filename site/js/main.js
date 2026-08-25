/**
 * ultimAItech — UI interactions
 */

(function () {
  'use strict';

  /* Active nav by current page */
  function normalizePath(pathname) {
    if (!pathname || pathname === '/') return '/';
    let path = pathname.replace(/\/+$/, '') || '/';
    if (path.startsWith('/en/')) path = path.slice(3) || '/';
    else if (path.startsWith('/de/')) path = path.slice(3) || '/';
    else if (path === '/en' || path === '/de') path = '/';
    return path;
  }

  const currentPath = normalizePath(window.location.pathname);
  document.querySelectorAll('.nav-links a, .footer-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) return;
    const linkUrl = new URL(href, window.location.origin);
    let linkPath = normalizePath(linkUrl.pathname);
    if (linkPath.endsWith('/blog')) linkPath = '/blog';
    let comparePath = currentPath;
    if (comparePath.endsWith('/blog')) comparePath = '/blog';
    if (linkPath === comparePath) {
      link.classList.add('active');
    }
  });

  if (window.UltimAItechI18n?.initI18n) {
    window.UltimAItechI18n.initI18n();
  }

  initLangSwitch();

  function initLangSwitch() {
    const i18n = window.UltimAItechI18n;

    function localeFromLabel(text) {
      const label = (text || '').trim().toUpperCase();
      if (label === 'NL') return 'nl';
      if (label === 'EN') return 'en';
      if (label === 'DE') return 'de';
      return null;
    }

    function navigateToLocale(locale) {
      if (i18n?.switchLocale) {
        i18n.switchLocale(locale);
        return;
      }
      window.location.href = locale === 'nl' ? '/' : `/${locale}/`;
    }

    document.querySelectorAll('.lang-switch button').forEach((btn) => {
      const locale = btn.dataset.locale || localeFromLabel(btn.textContent);
      if (!locale) return;
      btn.addEventListener('click', () => navigateToLocale(locale));
    });
  }

  /* Sticky header shadow on scroll */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* Mobile nav */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open');
      document.body.classList.toggle('nav-open', !expanded);
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
        document.body.classList.remove('nav-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* Contact form */
  const form = document.querySelector('.contact-form');
  if (form) {
    const params = new URLSearchParams(window.location.search);
    const successEl = document.getElementById('form-success');
    const fieldsEl = form.querySelector('.form-fields');

    if (params.get('success') === 'true' && successEl && fieldsEl) {
      successEl.hidden = false;
      fieldsEl.hidden = true;
    }

    form.addEventListener('submit', (e) => {
      const email = form.querySelector('#email');
      if (email && !email.value.includes('@')) {
        e.preventDefault();
        email.focus();
        email.setAttribute('aria-invalid', 'true');
      }
    });
  }

  /* Case study SEO showcase — counters, tabs, CTR chart */
  const seoShowcase = document.querySelector('[data-seo-showcase]');
  if (seoShowcase) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tabs = seoShowcase.querySelectorAll('.case-seo-tab');
    const panels = seoShowcase.querySelectorAll('.case-seo-panel');
    const counters = seoShowcase.querySelectorAll('.case-seo-count');
    const chartRows = seoShowcase.querySelectorAll('[data-seo-row]');
    const chartDetail = seoShowcase.querySelector('[data-seo-detail]');
    let countersStarted = false;

    const formatNumber = (value, decimals) => {
      const locale = window.UltimAItechI18n?.formatLocale?.() || 'nl-NL';
      return value.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    };

    const t = (key, vars) => (window.UltimAItechI18n?.t ? window.UltimAItechI18n.t(key, vars) : key);

    const animateCounter = (el) => {
      const from = parseFloat(el.dataset.countFrom || '0');
      const to = parseFloat(el.dataset.countTo || '0');
      const decimals = parseInt(el.dataset.countDecimals || '0', 10);
      const prefix = el.dataset.countPrefix ?? '';
      const suffix = el.dataset.countSuffix ?? '';
      const duration = reduceMotion ? 0 : 1400;
      const start = performance.now();

      const tick = (now) => {
        const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = from + (to - from) * eased;
        el.textContent = `${prefix}${formatNumber(current, decimals)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const startCounters = () => {
      if (countersStarted) return;
      countersStarted = true;
      seoShowcase.classList.add('is-animated');
      counters.forEach(animateCounter);
    };

    const formatPct = (value) => String(value).replace('.', ',');

    const updateChartDetail = (row) => {
      if (!chartDetail) return;
      const title = chartDetail.querySelector('.case-seo-chart-detail-title');
      const grid = chartDetail.querySelector('.case-seo-chart-detail-grid');
      if (!title || !grid) return;

      const ctrAfter = parseFloat(row.dataset.ctrAfter);
      const ctrBefore = parseFloat(row.dataset.ctrBefore);
      const bench = parseFloat(row.dataset.bench);
      const ppDiff = (ctrAfter - bench).toFixed(1);
      const multiplier = bench > 0 ? (ctrAfter / bench).toFixed(1) : '—';
      const ctrBeforeLabel = ctrBefore === 0 && parseInt(row.dataset.impBefore, 10) > 0
        ? `0% <span class="case-seo-detail-muted">(${t('seo.impressionsZero', { count: row.dataset.impBefore })})</span>`
        : `${formatPct(row.dataset.ctrBefore)}%`;

      title.textContent = t('seo.position', { pos: row.dataset.pos });
      grid.innerHTML = `
        <div><dt>${t('seo.impressions')}</dt><dd>${row.dataset.impBefore} → <strong>${row.dataset.impAfter}</strong></dd></div>
        <div><dt>${t('seo.clicks')}</dt><dd>${row.dataset.clicksBefore} → <strong>${row.dataset.clicksAfter}</strong></dd></div>
        <div><dt>${t('seo.ctrPrevious')}</dt><dd>${ctrBeforeLabel}</dd></div>
        <div><dt>${t('seo.ctrCurrent')}</dt><dd><strong>${formatPct(row.dataset.ctrAfter)}%</strong></dd></div>
        <div><dt>${t('seo.industryAvg')}</dt><dd>~${formatPct(row.dataset.bench)}%</dd></div>
        <div class="case-seo-chart-detail-compare"><dt>${t('seo.vsIndustry')}</dt><dd><strong>+${formatPct(ppDiff)} pp</strong> · ${multiplier}${t('seo.timesHigher')}</dd></div>
      `;
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('aria-controls');
        tabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', String(active));
        });
        panels.forEach((panel) => {
          const active = panel.id === targetId;
          panel.classList.toggle('is-active', active);
          panel.hidden = !active;
        });
        if (targetId === 'seo-panel-ctr') {
          seoShowcase.classList.add('is-animated');
        }
      });
    });

    chartRows.forEach((row) => {
      row.addEventListener('click', () => {
        chartRows.forEach((r) => {
          const active = r === row;
          r.classList.toggle('is-active', active);
          r.setAttribute('aria-expanded', String(active));
        });
        updateChartDetail(row);
      });
    });

    if ('IntersectionObserver' in window) {
      const seoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startCounters();
              seoObserver.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );
      seoObserver.observe(seoShowcase);
    } else {
      startCounters();
    }
  }
})();

/* WOW enhancements — kinetic hero reveal + magnetic buttons */
(function () {
  'use strict';

  requestAnimationFrame(() => document.body.classList.add('ready'));

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;
  if (reduce || !fine) return;

  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.12;
      const y = (e.clientY - r.top - r.height / 2) * 0.18;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
})();

(function () {
  'use strict';

  document.querySelectorAll('[data-map-lazy]').forEach((container) => {
    const src = container.dataset.mapSrc;
    const title = container.dataset.mapTitle || 'Map';
    const button = container.querySelector('[data-map-load-btn]');
    if (!src || !button) return;

    button.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.title = title;
      iframe.src = src;
      iframe.loading = 'lazy';
      container.classList.remove('contact-map--lazy');
      container.replaceChildren(iframe);
    });
  });
})();
