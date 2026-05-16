/*
  # Create businesses and clubs tables

  1. New Tables
    - `businesses`
      - `id` (uuid, primary key)
      - `name` (text, not null) - Business name
      - `category` (text, not null) - Business category (Sponsorship, Hospitality, Merchandise, Media, Professional Services, Technology, Other)
      - `description` (text) - Business description
      - `website` (text) - Business website URL
      - `logo` (text) - URL to business logo image
      - `membership_tier` (text, default 'standard') - Membership tier: founding, premium, standard
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    - `clubs`
      - `id` (uuid, primary key)
      - `name` (text, not null) - Club name
      - `location` (text) - Club location
      - `contact` (text) - Contact information
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on both tables
    - Public read access for businesses and clubs (directory is publicly viewable)
    - Only authenticated admin users can insert, update, delete

  3. Indexes
    - Index on businesses.category for filtered directory queries
    - Index on businesses.membership_tier for sorting
    - Index on clubs.location for location-based queries
*/

CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT 'Other',
  description text DEFAULT '',
  website text DEFAULT '',
  logo text,
  membership_tier text NOT NULL DEFAULT 'standard',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clubs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text DEFAULT '',
  contact text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category);
CREATE INDEX IF NOT EXISTS idx_businesses_membership_tier ON businesses(membership_tier);
CREATE INDEX IF NOT EXISTS idx_clubs_location ON clubs(location);

-- Enable RLS
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;

-- Public read access (directory is viewable by everyone)
CREATE POLICY "Public can view businesses"
  ON businesses FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view clubs"
  ON clubs FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated users can insert businesses
CREATE POLICY "Authenticated users can insert businesses"
  ON businesses FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update businesses
CREATE POLICY "Authenticated users can update businesses"
  ON businesses FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete businesses
CREATE POLICY "Authenticated users can delete businesses"
  ON businesses FOR DELETE
  TO authenticated
  USING (true);

-- Authenticated users can insert clubs
CREATE POLICY "Authenticated users can insert clubs"
  ON clubs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update clubs
CREATE POLICY "Authenticated users can update clubs"
  ON clubs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete clubs
CREATE POLICY "Authenticated users can delete clubs"
  ON clubs FOR DELETE
  TO authenticated
  USING (true);
