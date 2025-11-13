-- Create manifesto_signatures table for tracking community engagement
CREATE TABLE public.manifesto_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  signed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for performance
CREATE INDEX idx_signatures_date ON public.manifesto_signatures(signed_at DESC);

-- Enable Row Level Security
ALTER TABLE public.manifesto_signatures ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Anyone can view signature count
CREATE POLICY "Anyone can view signatures"
  ON public.manifesto_signatures FOR SELECT
  USING (true);

-- RLS Policy: Anyone can sign once (unique email constraint handles duplicates)
CREATE POLICY "Anyone can sign the manifesto"
  ON public.manifesto_signatures FOR INSERT
  WITH CHECK (true);

-- Enable realtime for live counter updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.manifesto_signatures;