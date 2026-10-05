/*
# Create audit_requests table

1. New Tables
- `audit_requests`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — submitter's full name
  - `email` (text, not null) — submitter's email address
  - `company` (text) — company or organization name
  - `team_size` (text) — selected team size range (e.g. "1-10", "11-50")
  - `current_tools` (text) — tools and systems currently in use
  - `biggest_friction` (text) — description of main operational pain point
  - `status` (text, default 'pending') — processing status of the request
  - `created_at` (timestamptz, default now()) — submission timestamp

2. Security
- Enable RLS on `audit_requests`.
- Allow anon + authenticated INSERT: the public audit form submits without sign-in.
- No SELECT/UPDATE/DELETE policies for anon: submissions are private to the team.
- Authenticated SELECT/UPDATE/DELETE: allows admin review once sign-in is added later.

3. Important Notes
- This is a no-auth public form — anon INSERT is intentionally allowed.
- Email is not marked UNIQUE because a business may submit multiple audit requests over time.
- The `status` column defaults to 'pending' and can be updated to 'reviewed', 'contacted', 'completed' by an admin.
*/

CREATE TABLE IF NOT EXISTS audit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  team_size text,
  current_tools text,
  biggest_friction text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE audit_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_audit_requests" ON audit_requests;
CREATE POLICY "anon_insert_audit_requests"
ON audit_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_audit_requests" ON audit_requests;
CREATE POLICY "auth_select_audit_requests"
ON audit_requests FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "auth_update_audit_requests" ON audit_requests;
CREATE POLICY "auth_update_audit_requests"
ON audit_requests FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_audit_requests" ON audit_requests;
CREATE POLICY "auth_delete_audit_requests"
ON audit_requests FOR DELETE
TO authenticated
USING (true);
