export const businessCategories: string[] = [
  'Sponsorship & Advertising',
  'Sports Physiotherapy & Rehab',
  'Kit & Teamwear Manufacturing',
  'Corporate Hospitality',
  'Pitch Maintenance & Grounds',
  'Legal & Sports Agency',
  'Media & Broadcasting',
  'Professional Services',
  'Technology & Analytics',
  'Merchandise & Retail',
  'Catering & Events',
  'Travel & Tours',
  'Sports Nutrition & Supplements',
  'Insurance & Risk Management',
  'Facility Design & Construction',
  'Other / Custom Segment',
];

export function sanitizeUrl(input: string): string {
  if (!input) return input;
  const trimmed = input.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}
