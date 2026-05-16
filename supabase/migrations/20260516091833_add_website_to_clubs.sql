/*
  # Add website column to clubs table

  1. Modified Tables
    - `clubs`
      - Added `website` column (text, nullable) - Club website URL

  2. Notes
    - The club registration form now includes a website field
    - URLs are sanitized (https:// prepended if missing) before insertion
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'clubs' AND column_name = 'website'
  ) THEN
    ALTER TABLE clubs ADD COLUMN website text;
  END IF;
END $$;
