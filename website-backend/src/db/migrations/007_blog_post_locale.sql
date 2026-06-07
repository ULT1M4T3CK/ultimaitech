ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS locale VARCHAR(5) NOT NULL DEFAULT 'nl';

ALTER TABLE blog_posts DROP CONSTRAINT IF EXISTS blog_posts_slug_key;
ALTER TABLE blog_posts DROP CONSTRAINT IF EXISTS blog_posts_slug_locale_unique;
ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_slug_locale_unique UNIQUE (slug, locale);

CREATE INDEX IF NOT EXISTS idx_blog_posts_locale_status
  ON blog_posts(locale, status, published_at DESC);
