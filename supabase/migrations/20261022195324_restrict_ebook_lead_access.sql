/*
# Restrict ebook lead browser access

1. Modified Tables
- `ebook_leads`
- Keep INSERT access for public lead submissions.
- Remove SELECT, UPDATE, and DELETE access from anonymous and authenticated browser roles.

2. Security
- Personal lead information cannot be read, changed, or removed through the public client.
- The existing insert-only row-level security policy remains the only browser-facing operation.

3. Important Notes
- This migration preserves every submitted lead and changes only browser permissions.
- Administrative access can still be handled through trusted server-side tooling.
*/

REVOKE SELECT, UPDATE, DELETE ON public.ebook_leads FROM anon, authenticated;
GRANT INSERT ON public.ebook_leads TO anon, authenticated;