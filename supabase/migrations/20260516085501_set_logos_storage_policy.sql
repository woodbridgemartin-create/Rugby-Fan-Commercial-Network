/*
  # Set storage policy for logos bucket

  1. Storage
    - Allow public read access to logos bucket
    - Allow authenticated users to upload to logos bucket

  2. Notes
    - The logos bucket was created for business logos and club badges/crests
    - Public read is needed so directory listings can display images
    - Authenticated upload is needed for admin and registration forms
*/

-- Allow anyone to read from logos bucket
CREATE POLICY "Public can view logos"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'logos');

-- Allow authenticated users to upload to logos bucket
CREATE POLICY "Authenticated can upload logos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'logos');

-- Allow authenticated users to update logos
CREATE POLICY "Authenticated can update logos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'logos')
  WITH CHECK (bucket_id = 'logos');
