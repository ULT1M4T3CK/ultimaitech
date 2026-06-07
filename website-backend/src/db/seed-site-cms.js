/**
 * Default site content for the locale-aware CMS.
 * Structure: { nl: {...}, de: {...}, en: {...} }
 * The backend auto-migrates legacy flat payloads into { nl: <legacy> }.
 */
const SITE_URL = 'https://ultimaitech.com';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const defaultContent = {
  nl: {},
  de: {},
  en: {},
};

const defaultSeo = {
  nl: {},
  de: {},
  en: {},
};

const defaultAssets = {
  logo: null,
  ogImage: OG_IMAGE,
  favicon: `${SITE_URL}/favicon.svg`,
};

module.exports = { defaultContent, defaultSeo, defaultAssets };
