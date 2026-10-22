/*
# Create ebook lead capture table

1. New Tables
- `ebook_leads`
- `id` (uuid, primary key)
- `name` (text, visitor's name)
- `whatsapp` (text, visitor's WhatsApp number)
- `email` (text, visitor's email address)
- `niche` (text, selected business niche)
- `return_tracking` (text, selected customer-return tracking method)
- `monthly_revenue` (text, selected monthly revenue range)
- `created_at` (timestamptz, submission timestamp)

2. Security
- Enable Row Level Security on `ebook_leads`.
- Grant INSERT only to anonymous and authenticated visitors because this is a public lead form.
- Do not grant read, update, or delete access to browser roles; submitted personal data is not exposed through the public client.
- Add an insert policy that permits the landing page to create a lead record.

3. Important Notes
- This is a single-tenant lead capture table and does not require accounts or sign-in.
- The application validates required fields before submission and stores the qualification answers with the lead.
*/

CREATE TABLE IF NOT EXISTS public.ebook_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  whatsapp text NOT NULL,
  email text NOT NULL,
  niche text NOT NULL,
  return_tracking text NOT NULL,
  monthly_revenue text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ebook_leads ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON public.ebook_leads TO anon, authenticated;

DROP POLICY IF EXISTS "Public can submit ebook leads" ON public.ebook_leads;
CREATE POLICY "Public can submit ebook leads"
  ON public.ebook_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) BETWEEN 2 AND 120
    AND length(trim(whatsapp)) BETWEEN 8 AND 30
    AND length(trim(email)) BETWEEN 5 AND 255
    AND length(trim(niche)) BETWEEN 2 AND 80
    AND length(trim(return_tracking)) BETWEEN 2 AND 120
    AND length(trim(monthly_revenue)) BETWEEN 2 AND 80
  );