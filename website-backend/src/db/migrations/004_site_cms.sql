-- Site CMS: content, SEO, and assets editable from admin
-- Single row table; content, seo, and assets are JSONB

CREATE TABLE IF NOT EXISTS site_settings (
  id SMALLINT PRIMARY KEY DEFAULT 1,
  content JSONB NOT NULL DEFAULT '{}',
  seo JSONB NOT NULL DEFAULT '{}',
  assets JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_site_settings_single_row CHECK (id = 1)
);

CREATE INDEX IF NOT EXISTS idx_site_settings_id ON site_settings(id);
