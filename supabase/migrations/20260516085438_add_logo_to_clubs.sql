/*
  # Add logo column to clubs table

  1. Modified Tables
    - `clubs`
      - Added `logo` column (text, nullable) - URL to the club's badge/crest image

  2. Notes
    - The `businesses` table already has a `logo` column
    - This brings parity between the two tables for image support
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'clubs' AND column_name = 'logo'
  ) THEN
    ALTER TABLE clubs ADD COLUMN logo text;
  END IF;
END $$;
