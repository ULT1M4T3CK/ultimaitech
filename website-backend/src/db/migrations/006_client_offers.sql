-- Client proposals / custom offers (admin-managed, public read by share_token)

CREATE TABLE IF NOT EXISTS client_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  share_token TEXT NOT NULL UNIQUE,
  client_label TEXT,
  title TEXT NOT NULL,
  body_html TEXT NOT NULL DEFAULT '',
  line_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  valid_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_offers_share_token ON client_offers(share_token);
CREATE INDEX IF NOT EXISTS idx_client_offers_updated_at ON client_offers(updated_at DESC);
