import { useState } from 'react';

const MAJOR_INDUSTRIES = [
  'Construction & Engineering',
  'Financial Services & Accounting',
  'Legal & Corporate Advisory',
  'Logistics, Transport & Shipping',
  'Marketing, Design & Public Relations',
  'Technology, Software & IT Support',
  'Health, Fitness & Sports Therapy',
  'Hospitality, Catering & Event Management',
  'Manufacturing & Industrial Supplies',
  'Real Estate & Property Management',
  'Retail, E-commerce & Merchandising',
  'Recruitment & Human Resources',
  'Other (Type custom industry below)'
];

export default function IndustrySelectorExample() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Business Sector / Industry Industry
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
          required
        >
          <option value="">Select your structural sector...</option>
          {MAJOR_INDUSTRIES.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </div>

      {/* Renders instantly if 'Other' is picked */}
      {selectedCategory.includes('Other') && (
        <div className="animate-fadeIn">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Specify Your Custom Industry
          </label>
          <input
            type="text"
            placeholder="e.g. Bespoke Sports Turf Engineering"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
            required
          />
        </div>
      )}
    </div>
  );
}
